import {DealershipMemberCreateWithUniqueFieldsDTOType, DealershipMemberType, DealershipMemberUpdateDTOType} from "../types/DealershipMemberType.ts";
import {DealershipMember} from "../models/mongoose/dealershipMember.model.ts";
import {FilterQuery, PipelineStage} from "mongoose";
import {DealershipMemberQueryType} from "../types/QueryType.ts";

class DealershipMemberRepository{
    public async get(memberId: string): Promise<DealershipMemberType | null>{
        return await DealershipMember.findById(memberId)
    }

    public async create(dto: DealershipMemberCreateWithUniqueFieldsDTOType): Promise<DealershipMemberType>{
        return await DealershipMember.create(dto)
    }

    public async getList(dealershipId: string, query: DealershipMemberQueryType): Promise<[DealershipMemberType[], number]>{
        const {limit, page, skip} = query
        const filter: FilterQuery<DealershipMemberType> = {dealership_id: dealershipId}
        return await Promise.all([await DealershipMember.find(filter).limit(limit).skip((page-1)*limit + skip),await DealershipMember.countDocuments(filter)])
    }

    public async findOneByParams(dto: Partial<DealershipMemberType>): Promise<DealershipMemberType | null>{
        return await DealershipMember.findOne(dto)
    }

    public async findManyByParams(dto: Partial<DealershipMemberType>): Promise<DealershipMemberType[]>{
        return await DealershipMember.find(dto)
    }


    public async delete(memberId: string): Promise<DealershipMemberType | null>{
        return await DealershipMember.findByIdAndDelete(memberId)
    }

    public async deleteByParams(params: Partial<DealershipMemberType>){
        return await DealershipMember.deleteMany(params)
    }

    public async update(memberId: string, dto: DealershipMemberUpdateDTOType): Promise<DealershipMemberType | null>{
        return await DealershipMember.findByIdAndUpdate(memberId, dto, {new: true})
    }

    public async getAverageRatings(): Promise<{dealership_id: string, avg: number}[]>{
        const pipeline: PipelineStage[] = [
            {
                $group: {
                    _id: "$dealership_id",
                    avg: {$avg: "$rating"}
                }
            },
            {
                $addFields: {
                    dealership_id: "$_id"
                }
            },
            {
                $unset: "_id"
            }
        ]
        return await DealershipMember.aggregate(pipeline)
    }

}

export const dealershipMemberRepository = new DealershipMemberRepository()

