import {DealershipReviewCreateDTOType, DealershipReviewType} from "../types/DealershipReviewType.ts";
import {dealershipReviewRepository} from "../repository/dealership.review.repository.ts";
import {ApiError} from "../errors/api.error.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {DealershipReviewQueryType} from "../types/QueryType.ts";

class DealershipReviewService{
    public async create(dto: DealershipReviewCreateDTOType, dealershipId: string, userId: string): Promise<DealershipReviewType>{
        const review = await dealershipReviewRepository.findOneByParams({dealership_id: dealershipId, author_id: userId})
        if(review){
            throw new ApiError("Користувач може опублікувати лише один відгук", StatusCodeEnum.CONFLICT)
        }
        return dealershipReviewRepository.create({...dto, dealership_id: dealershipId, author_id: userId})
    }

    public async getList(query: DealershipReviewQueryType, filterInput: Partial<DealershipReviewType>){
        return dealershipReviewRepository.getList(query, filterInput)
    }

    public async get(reviewId: string): Promise<DealershipReviewType> {
        return await dealershipReviewRepository.get(reviewId) as DealershipReviewType
    }

    public async update(reviewId: string, dto: Partial<DealershipReviewType>): Promise<DealershipReviewType> {
        return await dealershipReviewRepository.update(reviewId, dto) as DealershipReviewType
    }

    public async delete(reviewId: string): Promise<DealershipReviewType> {
        return await dealershipReviewRepository.delete(reviewId) as DealershipReviewType
    }

}

export const dealershipReviewService = new DealershipReviewService()