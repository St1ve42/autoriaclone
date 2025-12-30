import joi from "joi";
import {UserSearchByEnum} from "../enums/userEnums/user.search.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {UserOrderByEnum} from "../enums/userEnums/user.order.by.enum.ts";
import {VehicleSearchByEnum} from "../enums/vehicleEnums/vehicle.search.by.enum.ts";
import {VehicleOrderByEnum} from "../enums/vehicleEnums/vehicle.order.by.enum.ts";
import {AnnouncementSearchByEnum} from "../enums/announcementEnums/announcement.search.by.enum.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";
import Joi from "joi";
import {AnnouncementRangeByEnum} from "../enums/announcementEnums/announcement.range.by.enum.ts";
import {UserRangeByEnum} from "../enums/userEnums/user.range.by.enum.ts";

export class QueryValidator{
    private static page = joi.number().min(1).max(500).default(1)
    private static limit = joi.number().min(1).max(100).default(10)
    private static skip = joi.number().min(0).default(0)
    private static searchBy = joi.string().trim()
    private static search = joi.string().trim().lowercase()
    private static orderBy = joi.string().trim()
    private static order = joi.string().trim().valid(...Object.values(OrderEnum))
    private static from = joi.number().min(1)
    private static to = joi.number().min(1)
    private static rangeBy = joi.string().trim()

    private static baseValidator = joi.object({
        page: this.page,
        limit: this.limit,
        skip: this.skip,
        search: this.search,
        order: this.order.when('orderBy', {
            is: Joi.exist(),
            then: this.order.default(OrderEnum.ASC)
        }),
        from: this.from,
        to: this.to
    }).and("search", "searchBy")

    public static userValidator = this.baseValidator.keys({
        searchBy: this.searchBy.valid(...Object.values(UserSearchByEnum)),
        orderBy: this.orderBy.valid(...Object.values(UserOrderByEnum)),
        rangeBy: this.rangeBy.valid(...Object.values(UserRangeByEnum))
    })

    public static vehicleValidator = this.baseValidator.keys({
        searchBy: this.searchBy.valid(...Object.values(VehicleSearchByEnum)),
        orderBy: this.orderBy.valid(...Object.values(VehicleOrderByEnum)),
        rangeBy: this.rangeBy.valid(...Object.values(UserOrderByEnum))
    })

    public static announcementValidator = this.baseValidator.keys({
        searchBy: this.searchBy.valid(...Object.values(AnnouncementSearchByEnum)),
        orderBy: this.orderBy.valid(...Object.values(AnnouncementOrderByEnum)),
        rangeBy: this.rangeBy.valid(...Object.values(AnnouncementRangeByEnum))
    })

}

