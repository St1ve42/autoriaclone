import type {Request, Response, NextFunction} from "express"
import {dealershipMemberService} from "../services/dealership.member.service.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {TokenPayloadType} from "../types/TokenType.ts";
import {dealershipReviewService} from "../services/dealership.review.service.ts";
import {AdminRoleEnums} from "../enums/adminEnums/admin.role.enums.ts";
import {userService} from "../services/user.service.ts";

class DealershipMemberMiddleware{
    public async checkMember (req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const dealershipId = req.params.dealershipId
            const memberId = req.params.memberId
            const member = await dealershipMemberService.get(memberId)
            if(member.user_id === user_id){
                throw new ApiError("Користувач не може робити цю дію над самим собою", StatusCodeEnum.CONFLICT)
            }
            if(member.dealership_id.toString() !== dealershipId){
                throw new ApiError("Співробітник не є членом поточного автосалону", StatusCodeEnum.CONFLICT)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

    public async checkReview (req: Request, res: Response, next: NextFunction){
        try{
            const dealershipId = req.params.dealershipId
            const reviewId = req.params.reviewId
            const {dealership_id: reviewDealershipId, author_id: reviewAuthorId} = await dealershipReviewService.get(reviewId)
            if(reviewDealershipId.toString() !== dealershipId){
                throw new ApiError("Відгук не належить цьому автосалону", StatusCodeEnum.NOT_FOUND)
            }
            const {user_id} = res.locals.payload as TokenPayloadType
            const {Role: {name: roleName}} = await userService.get(user_id)
            const isOwner = reviewAuthorId === user_id
            const isAdmin = Object.values(AdminRoleEnums).some(name => name === roleName)
            if(!isOwner && !isAdmin){
                throw new ApiError("Користувач не може змінювати чужий відгук", StatusCodeEnum.FORBIDDEN)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

}

export const dealershipMemberMiddleware = new DealershipMemberMiddleware()