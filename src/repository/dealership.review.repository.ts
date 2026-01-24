import {DealershipReviewCreateWithUniqueFieldsDTOType, DealershipReviewType} from "../types/DealershipReviewType.ts";
import {DealershipReview} from "../models/mongoose/dealershipReview.model.ts";
import {DealershipReviewQueryType} from "../types/QueryType.ts";
import {SortQuery} from "../types/SortQuery.ts";
import {DealershipReviewOrderByEnum} from "../enums/dealershipReviewsEnums/dealership.review.orderBy.enum.ts";
import {FilterQuery} from "mongoose";

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

    public async findManyByParams(dto: Partial<DealershipReviewType>): Promise<DealershipReviewType[]>{
        return DealershipReview.find(dto)
    }

    public async findOneByParams(dto: Partial<DealershipReviewType>): Promise<DealershipReviewType| null>{
        return DealershipReview.findOne(dto)
    }

    public async getList(dealership_id: string, query: DealershipReviewQueryType): [DealershipReviewType[], number]{
        const {limit, page, skip, orderBy, order} = query
        const sort: SortQuery<DealershipReviewOrderByEnum> = {}
        const filter: FilterQuery<DealershipReviewType> = {dealership_id}
        if(order && orderBy){
            sort[orderBy] = order === "asc" ? 1 : -1
        }
        return await Promise.all([await DealershipReview.find(filter).sort(sort).limit(limit).skip((page-1)*limit + skip), await DealershipReview.countDocuments(filter)])
    }

}

export const dealershipReviewRepository = new DealershipReviewRepository()