import {BaseType} from "./BaseType.ts";

type DealershipReviewType = {
    _id: string
    dealership_id: string,
    author_id: string,
    rating: number,
    text?: string,
} & BaseType

type DealershipReviewCreateDTOType = Pick<DealershipReviewType, "rating" | "text">
type DealershipReviewCreateWithUniqueFieldsDTOType = Pick<DealershipReviewType, "rating" | "text" | "dealership_id" | "author_id">
type DealershipReviewUpdateDTOType = Partial<Pick<DealershipReviewType, "rating" | "text">>

export type {DealershipReviewType, DealershipReviewCreateDTOType, DealershipReviewUpdateDTOType, DealershipReviewCreateWithUniqueFieldsDTOType}


