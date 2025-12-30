import {DealershipCreateWithInputDTOType, DealershipType, DealershipUpdateWithInputDTOType, DealershipUpdateWithoutInputDTOType} from "../types/DealershipType.ts";
import {dealershipRepository} from "../repository/dealership.repository.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service.ts";
import {FileItemTypeEnum} from "../enums/generalEnums/FileEnum.ts";
import {undefined} from "effect/Match";

class DealershipService{
    public async create(dto: DealershipCreateWithInputDTOType, user_id: string): Promise<DealershipType>{
        const dealership = await dealershipRepository.findByParams({owner_id: user_id})
        if(dealership.length !== 0){
            throw new ApiError("User has already dealership", StatusCodeEnum.CONFLICT)
        }
        return await dealershipRepository.create({...dto, owner_id: user_id})
    }

    public async get(id: string): Promise<DealershipType>{
        return await dealershipRepository.get(id) as DealershipType
    }

    public async getList(): Promise<DealershipType[]>{
        return await dealershipRepository.getList()
    }

    public async update(id: string, dto: DealershipUpdateWithInputDTOType): Promise<DealershipType>{
        return await dealershipRepository.update(id, dto) as DealershipType //TODO check if exactly this user can update it
    }

    public async delete(id: string): Promise<DealershipType>{
        return await dealershipRepository.delete(id) as DealershipType //TODO the same thing
    }

    public async findByParams(params: DealershipUpdateWithoutInputDTOType): Promise<DealershipType[]>{
        return await dealershipRepository.findByParams(params)
    }

    public async uploadLogo(id: string, logo: UploadedFile): Promise<DealershipType>{
        const dealership = await this.get(id)
        if(dealership.logo){
            await s3Service.deleteFile(dealership.logo)
        }
        const path = await s3Service.uploadFile(FileItemTypeEnum.DEALERSHIP, id, logo)
        return await this.update(id, {logo: path})
    }

    public async deleteLogo(id: string): Promise<DealershipType>{
        const dealership = await this.get(id)
        if(!dealership.logo){
            throw new ApiError("Logo not found", StatusCodeEnum.NOT_FOUND)
        }
        await s3Service.deleteFile(dealership.logo)
        return await this.update(id, {logo: null})
    }

    public async verify(id: string): Promise<DealershipType>{
        return await dealershipRepository.update(id, {is_verified: true}) as DealershipType
    }

    public async unverify(id: string): Promise<DealershipType>{
        return await dealershipRepository.update(id, {is_verified: false}) as DealershipType
    }

}

export const dealerShipService= new DealershipService()

//TODO dealership role permissions