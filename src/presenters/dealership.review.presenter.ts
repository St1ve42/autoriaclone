import {DealershipReviewType} from "../types/DealershipReviewType.ts";
import {userService} from "../services/user.service.ts";
import {userPresenter} from "./user.presenter.ts";
import {DealershipReviewQueryType} from "../types/QueryType.ts";

class DealershipReviewPresenter{
    public async list(
        dealershipReviews: DealershipReviewType[],
        total: number,
        query: DealershipReviewQueryType
    ) {
        return {
            data: await Promise.all(dealershipReviews.map(this.res)),
            total,
            ...query
        }
    }

    public async res(dealershipReview: DealershipReviewType){
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