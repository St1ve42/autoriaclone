import {UserCreateDTOType} from "../types/UserType.ts";
import {SignInType, SignResultType} from "../types/AuthType.ts";
import {passwordService} from "./password.service.ts";
import {userService} from "./user.service.ts";
import {tokenService} from "./token.service.ts";
import {TokenTypeEnum} from "../enums/authEnums/token.type.enum.ts";
import {tokenRepository} from "../repository/token.repository.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {TokenPairType, TokenPayloadType} from "../types/TokenType.ts";
import {emailService} from "./email.service.ts";
import {EmailEnum} from "../enums/generalEnums/email.enum.ts";
import {configs} from "../configs/configs.ts";
import {User} from "../../prisma/src/generated/prisma/client.ts";
import {userRepository} from "../repository/user.repository.ts";
import {GlobalRoleEnums} from "../enums/globalRoleEnums/globalRoleEnums.ts";
import {UserWithIncludedRegionAndRoleType} from "../types/UserWithIncludeDataType.ts";

class AuthService{

    public async signUp(user: UserCreateDTOType): Promise<SignResultType>{
        user.password = await passwordService.hash(user.password)
        const newUser = await userService.create(user)
        const {id: user_id, role_id, name, surname, email} = newUser
        const payload = {user_id, role_id}
        const tokenPair = tokenService.generateTokenPair(payload)
        await tokenRepository.create({...tokenPair, User: {connect: {id: user_id}}})
        const actionToken = tokenService.generateActionToken(payload, TokenTypeEnum.ACTIVATE)
        await emailService.sendEmail(EmailEnum.WELCOME, email, {name, surname, action_token: actionToken, app_host: configs.APP_HOST, app_port: configs.APP_PORT})
        return {user: newUser, tokenPair}
    }

    public async signIn(dto: SignInType): Promise<SignResultType>{
        const {email, password} = dto
        const user = await userService.getByEmail(email)
        if(!user){
            throw new ApiError("Invalid email or password", StatusCodeEnum.FORBIDDEN)
        }
        const isValidPassword = await passwordService.compare(password, user.password)
        if(!isValidPassword){
            throw new ApiError("Invalid email or password", StatusCodeEnum.FORBIDDEN)
        }
        if(!await userService.isActive(user.id)){
            throw new ApiError("User is not active", StatusCodeEnum.FORBIDDEN)
        }
        if(await userService.isDeleted(user.id)){
            throw new ApiError("User is deleted", StatusCodeEnum.FORBIDDEN)
        }
        const tokenPair = tokenService.generateTokenPair({user_id: user.id, role_id: user.role_id})
        await tokenRepository.create({...tokenPair, User: {connect: {id: user.id}}})
        return {user, tokenPair}
    }

    public async refresh(payload: TokenPayloadType, token_id: string): Promise<TokenPairType>{
        const {user_id, role_id} = payload
        await tokenRepository.delete({id: token_id})
        const tokenPair = tokenService.generateTokenPair({user_id, role_id})
        await tokenRepository.create({...tokenPair, User: {connect: {id: user_id}}})
        return tokenPair
    }

    public async logOut(token: string): Promise<void>{
        await tokenRepository.delete({access_token: token})
    }

    public async logOutAll(user_id: string): Promise<void>{
        await tokenRepository.deleteManyByParams({user_id})
    }

    public async activate(token: string): Promise<UserWithIncludedRegionAndRoleType> {
        const {user_id} = tokenService.verify(token, TokenTypeEnum.ACTIVATE)
        return await userRepository.updateByIdAndParams(user_id, {is_active: true, is_verified: true, Role: {connect: {name: GlobalRoleEnums.USER}}}) as UserWithIncludedRegionAndRoleType
    }

    public async recoveryRequest(email: string): Promise<void> {
        const user = await userService.getByEmail(email)
        if(!user){
            throw new ApiError("Не існує такого користувача в системі", StatusCodeEnum.NOT_FOUND)
        }
        const {id: user_id, role_id} = user
        const recoveryToken = tokenService.generateActionToken({user_id, role_id}, TokenTypeEnum.RECOVERY)
        await emailService.sendEmail(EmailEnum.FORGOT_PASSWORD, email, {action_token: recoveryToken, app_host: configs.APP_HOST, app_port: configs.APP_PORT})
    }

    public async recovery(password: string, token: string): Promise<UserWithIncludedRegionAndRoleType>{
        const {user_id} = tokenService.verify(token, TokenTypeEnum.RECOVERY)
        const user = await userService.get(user_id)
        const isCoincidence = await passwordService.compare(password, user.password)
        if(isCoincidence){
            throw new ApiError("Password must not coincidence with old one", StatusCodeEnum.CONFLICT)
        }
        const newHashedPassword = await passwordService.hash(password)
        return await userRepository.updateByIdAndParams(user_id, {password: newHashedPassword}) as UserWithIncludedRegionAndRoleType
    }

    public async change(dto: Record<"password" | "oldPassword", string>, id: string): Promise<UserWithIncludedRegionAndRoleType>{
        const {password, oldPassword} = dto
        const user = await userService.get(id)
        const isCoincidenceOldPassword = await passwordService.compare(oldPassword, user.password)
        if(!isCoincidenceOldPassword){
            throw new ApiError("Invalid old password", StatusCodeEnum.FORBIDDEN)
        }
        const isCoincidencePassword = await passwordService.compare(password, user.password)
        if(isCoincidencePassword){
            throw new ApiError("Password must not coincidence with old one", StatusCodeEnum.CONFLICT)
        }
        const newHashedPassword = await passwordService.hash(password)
        await tokenRepository.deleteManyByParams({user_id: user.id})
        return await userRepository.updateByIdAndParams(id, {password: newHashedPassword}) as UserWithIncludedRegionAndRoleType
    }

}

export const authService = new AuthService()

//Cloude service for SQL db
