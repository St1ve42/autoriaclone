import {DealershipReviewType} from "../types/DealershipReviewType.ts";
import {userService} from "../services/user.service.ts";
import {userPresenter} from "./user.presenter.ts";
import {DealershipReviewQueryType} from "../types/QueryType.ts";
import {dealerShipService} from "../services/dealership.service.ts";
import {dealershipPresenter} from "./dealership.presenter.ts";

class DealershipReviewPresenter{
    private async list(
        dealershipReviews: DealershipReviewType[],
        total: number,
        query: DealershipReviewQueryType,
        res: (dealershipReview: DealershipReviewType) => unknown
    ) {
        return {
            data: await Promise.all(dealershipReviews.map(res)),
            total,
            ...query
        }
    }

    public async userList(
        dealershipReviews: DealershipReviewType[],
        total: number,
        query: DealershipReviewQueryType,
    ) {
        return await this.list(dealershipReviews, total, query, this.userRes)
    }

    public async dealershipList(
        dealershipReviews: DealershipReviewType[],
        total: number,
        query: DealershipReviewQueryType,
    ) {
        return await this.list(dealershipReviews, total, query, this.dealershipRes)
    }

    public async userRes(dealershipReview: DealershipReviewType) {
        const {dealership_id} = dealershipReview
        const dealership = await dealerShipService.get(dealership_id)
        return {
            id: dealershipReview._id,
            dealership: await dealershipPresenter.userRes(dealership),
            rating: dealershipReview.rating,
            text: dealershipReview.text
        }
    }

    public async dealershipRes(dealershipReview: DealershipReviewType){
        const {author_id} = dealershipReview
        const user = await userService.get(author_id)
        return {
            id: dealershipReview._id,
            user: userPresenter.reviewRes(user),
            rating: dealershipReview.rating,
            text: dealershipReview.text
        }
    }

}

export const dealershipReviewPresenter = new DealershipReviewPresenter()