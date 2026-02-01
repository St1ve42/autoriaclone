import {DealershipReviewCreateWithUniqueFieldsDTOType, DealershipReviewType} from "../types/DealershipReviewType.ts";
import {DealershipReview} from "../models/mongoose/dealershipReview.model.ts";
import {DealershipReviewQueryType} from "../types/QueryType.ts";
import {SortQuery} from "../types/SortQuery.ts";
import {DealershipReviewOrderByEnum} from "../enums/dealershipReviewsEnums/dealership.review.orderBy.enum.ts";
import {FilterQuery, isObjectIdOrHexString} from "mongoose";
import {DealershipMember} from "../models/mongoose/dealershipMember.model.ts";
import {ObjectId} from "mongodb";

class DealershipReviewRepository{
    public async create(dto: DealershipReviewCreateWithUniqueFieldsDTOType): Promise<DealershipReviewType>{
        return DealershipReview.create(dto)
    }

    public async update(reviewId: string, dto: Partial<DealershipReviewType>): Promise<DealershipReviewType | null>{
        return DealershipReview.findByIdAndUpdate(reviewId, dto)
    }

    public async get(reviewId: string): Promise<DealershipReviewType | null>{
        return DealershipReview.findById(reviewId)
    }

    public async delete(reviewId: string): Promise<DealershipReviewType | null>{
        return DealershipReview.findByIdAndDelete(reviewId)
    }

    public async deleteByParams(params: Partial<DealershipReviewType>){
        return await DealershipMember.deleteMany(params)
    }

    public async findOneByParams(dto: Partial<DealershipReviewType>): Promise<DealershipReviewType| null>{
        return DealershipReview.findOne(dto)
    }

    public async getList(query: DealershipReviewQueryType, filterInput: Partial<DealershipReviewType>): Promise<[DealershipReviewType[], number]>{
        const {limit, page, skip, orderBy, order, searchBy, search} = query
        const sort: SortQuery<typeof DealershipReviewOrderByEnum> = {}
        const filter: FilterQuery<DealershipReviewType> = filterInput
        if(searchBy && search){
            let updatedSearch: ObjectId | string | undefined = search
            if(isObjectIdOrHexString(search)){
                updatedSearch = new ObjectId(search)
            }
            filter[searchBy] = updatedSearch
        }
        if(order && orderBy){
            sort[orderBy] = order === "asc" ? 1 : -1
        }
        return await Promise.all([await DealershipReview.find(filter).sort(sort).limit(limit).skip((page-1)*limit + skip), await DealershipReview.countDocuments(filter)])
    }

}

export const dealershipReviewRepository = new DealershipReviewRepository()