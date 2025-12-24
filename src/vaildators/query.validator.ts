import joi from "joi";
import {UserSearchByEnum} from "../enums/userEnums/user.search.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {UserOrderByEnum} from "../enums/userEnums/user.order.by.enum.ts";
import {VehicleSearchByEnum} from "../enums/vehicleEnums/vehicle.search.by.enum.ts";
import {VehicleOrderByEnum} from "../enums/vehicleEnums/vehicle.order.by.enum.ts";
import {AnnouncementSearchByEnum} from "../enums/announcementEnums/announcement.search.by.enum.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";
import Joi from "joi";

export class QueryValidator{
    private static page = joi.number().min(1).max(500).default(1)
    private static limit = joi.number().min(1).max(100).default(10)
    private static skip = joi.number().min(0).default(0)
    private static searchBy = joi.string().trim()
    private static search = joi.string().trim().lowercase()
    private static orderBy = joi.string().trim()
    private static order = joi.string().trim().valid(...Object.values(OrderEnum))

    private static baseValidator = joi.object({
        page: this.page,
        limit: this.limit,
        skip: this.skip,
        search: this.search,
        order: this.order.when('order_by', {
            is: Joi.exist(),
            then: this.order.default(OrderEnum.ASC)
        })
    }).and("search", "search_by")

    public static userValidator = this.baseValidator.keys({
        search_by: this.searchBy.valid(...Object.values(UserSearchByEnum)),
        order_by: this.orderBy.valid(...Object.values(UserOrderByEnum))
    })

    public static vehicleValidator = this.baseValidator.keys({
        search_by: this.searchBy.valid(...Object.values(VehicleSearchByEnum)),
        order_by: this.orderBy.valid(...Object.values(VehicleOrderByEnum))
    })

    public static announcementValidator = this.baseValidator.keys({
        search_by: this.searchBy.valid(...Object.values(AnnouncementSearchByEnum)),
        order_by: this.orderBy.valid(...Object.values(AnnouncementOrderByEnum))
    })

}

