import type {NextFunction, Request, Response} from "express";
import {TokenPayloadType} from "../types/TokenType.ts";
import {DealershipReviewCreateDTOType} from "../types/DealershipReviewType.ts";
import {dealershipReviewService} from "../services/dealership.review.service.ts";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.ts";
import {dealershipReviewPresenter} from "../presenters/dealership.review.presenter.ts";
import {DealershipType} from "../types/DealershipType.ts";
import {DealershipReviewQueryType} from "../types/QueryType.ts";

class DealershipReviewController{
    public async create (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const dealershipId = req.params.dealershipId as string
            const body = req.body as DealershipReviewCreateDTOType
            const review = await dealershipReviewService.create(body, dealershipId, user_id)
            res.status(StatusCodeEnum.CREATED).json(await dealershipReviewPresenter.dealershipRes(review))
        }
        catch(e){
            next(e)
        }
    }

    public async getDealershipReviews (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const dealershipId = req.params.dealershipId as string
            const query = req.query as unknown as DealershipReviewQueryType
            const [reviews, total] = await dealershipReviewService.getList(query, {dealership_id: dealershipId})
            res.status(StatusCodeEnum.OK).json(await dealershipReviewPresenter.dealershipList(reviews, total, query))
        }
        catch(e){
            next(e)
        }
    }

    public async get (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const reviewId = req.params.reviewId as string
            const review = await dealershipReviewService.get(reviewId)
            res.status(StatusCodeEnum.OK).json(await dealershipReviewPresenter.dealershipRes(review))
        }
        catch(e){
            next(e)
        }
    }

    public async update (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const reviewId = req.params.reviewId as string
            const body = req.body as Partial<DealershipType>
            const review = await dealershipReviewService.update(reviewId, body)
            res.status(StatusCodeEnum.OK).json(await dealershipReviewPresenter.dealershipRes(review))
        }
        catch(e){
            next(e)
        }
    }

    public async delete (req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const reviewId = req.params.reviewId as string
            const review = await dealershipReviewService.delete(reviewId)
            res.status(StatusCodeEnum.OK).json(await dealershipReviewPresenter.dealershipRes(review))
        }
        catch(e){
            next(e)
        }
    }

}

export const dealershipReviewController = new DealershipReviewController()