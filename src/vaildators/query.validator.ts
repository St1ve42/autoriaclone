import joi from "joi";
import {UserSearchByEnum} from "../enums/userEnums/user.search.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {UserOrderByEnum} from "../enums/userEnums/user.order.by.enum.ts";
import {AnnouncementSearchByEnum} from "../enums/announcementEnums/announcement.search.by.enum.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";
import Joi from "joi";
import {AnnouncementRangeByEnum} from "../enums/announcementEnums/announcement.range.by.enum.ts";
import {UserRangeByEnum} from "../enums/userEnums/user.range.by.enum.ts";
import {DealershipSearchByEnum} from "../enums/dealershipEnums/dealership.searchBy.enum.ts";
import {DealershipOrderByEnum} from "../enums/dealershipEnums/dealership.orderBy.enum.ts";
import {DealershipReviewOrderByEnum} from "../enums/dealershipReviewsEnums/dealership.review.orderBy.enum.ts";
import {UserValidator} from "./user.validator.ts";
import {BASE_MESSAGES} from "../constants/joi.constants.ts";
import {Utils} from "../utils/utils.ts";
import {DealershipReviewSearchByEnum} from "../enums/dealershipReviewsEnums/dealership.review.searchBy.enum.ts";
import {DealershipReviewValidator} from "./dealership.review.validator.ts";

export class QueryValidator{
    private static page = joi.number().min(1).max(500).default(1)
    private static limit = joi.number().min(1).max(100).default(10)
    private static skip = joi.number().min(0).default(0)
    private static searchBy = joi.string().trim()
    private static search = joi.alternatives()
    private static orderBy = joi.string().trim()
    private static order = joi.string().trim().valid(...Object.values(OrderEnum))
    private static from = joi.number().min(1)
    private static to = joi.number().min(1)
    private static rangeBy = joi.string().trim()
    private static addBaseMessages = Utils.addBaseMessages;

    public static basePaginationValidator = joi.object({
        page: this.addBaseMessages(this.page),
        limit: this.addBaseMessages(this.limit),
        skip: this.addBaseMessages(this.skip)
    })

    private static baseValidator = this.basePaginationValidator.keys({
        order: this.addBaseMessages(this.order.when('orderBy', {
            is: Joi.exist(),
            then: this.order.default(OrderEnum.ASC)
        })),
        from: this.addBaseMessages(this.from),
        to: this.addBaseMessages(this.to)
    }).and("search", "searchBy").messages({
        "object.and": "Параметр {{#present}} вимагає наявності {{#missing}}"
    }).options({
        errors: {
            wrap: {
                label: false,
                array: false,
                string: false
            }
        }
    })

    public static userValidator = this.baseValidator.keys({
        searchBy: this.addBaseMessages(this.searchBy.valid(...Object.values(UserSearchByEnum))),
        search: this.addBaseMessages(this.search.conditional('searchBy', {
            switch: UserValidator.userSearchCases,
            otherwise: Joi.string()
        })),
        orderBy: this.addBaseMessages(this.orderBy.valid(...Object.values(UserOrderByEnum))),
        rangeBy: this.addBaseMessages(this.rangeBy.valid(...Object.values(UserRangeByEnum)))
    })

    public static announcementValidator = this.baseValidator.keys({
        searchBy: this.addBaseMessages(this.searchBy.valid(...Object.values(AnnouncementSearchByEnum))),
        search: this.addBaseMessages(this.search.try(joi.string().trim())),
        orderBy: this.addBaseMessages(this.orderBy.valid(...Object.values(AnnouncementOrderByEnum))),
        rangeBy: this.addBaseMessages(this.rangeBy.valid(...Object.values(AnnouncementRangeByEnum)))
    })

    public static dealershipValidator = this.baseValidator.keys({
        searchBy: this.addBaseMessages(this.searchBy.valid(...Object.values(DealershipSearchByEnum))),
        search: this.addBaseMessages(this.search.try(joi.string().trim())),
        orderBy: this.addBaseMessages(this.orderBy.valid(...Object.values(DealershipOrderByEnum))),
    })

    public static dealershipReviewValidator = this.baseValidator.keys({
        orderBy: this.addBaseMessages(this.orderBy.valid(...Object.values(DealershipReviewOrderByEnum))),
        searchBy: this.addBaseMessages(this.searchBy.valid(...Object.values(DealershipReviewSearchByEnum))),
        search: this.addBaseMessages(this.search.conditional('searchBy', {
            switch: DealershipReviewValidator.dealershipReviewSearchCases,
            otherwise: Joi.string()
        }))
    })



}

