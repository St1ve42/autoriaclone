import {BaseType} from "./BaseType.ts";

export type DealershipReviewType = {
    _id: string
    dealership_id: string,
    author_id: string,
    rating: number,
    text: string,
} & BaseType