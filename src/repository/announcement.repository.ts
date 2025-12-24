import {Announcement} from "../models/mongoose/announcement.model.ts";
import {AnnouncementType, CreateAnnouncementInRepositoryDTOType, UpdateAnnouncementDTOType} from "../types/AnnouncementType.ts";
import {Aggregate, FilterQuery, PipelineStage} from "mongoose";
import {AnnouncementQueryType} from "../types/QueryType.ts";
import {Vehicle} from "../models/mongoose/vehicle.model.ts";
import {VehicleType} from "../types/VehicleType.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {AnnouncementListReturnType} from "../types/ListReturnType.ts";

type AnnouncementJoinVehicleType = AnnouncementType & {vehicle: VehicleType[]}

class AnnouncementRepository{
    public async getList(query: AnnouncementQueryType): Promise<AnnouncementListReturnType>{
        const {page, limit, skip, search_by, search, order_by, order} = query
        let filter: FilterQuery<AnnouncementType> = {}
        let sort: {[key: string]: 1 | -1} = {}
        if(search && search_by){
            filter[search_by] = {$regex: search, $options: "i"}
        }
        if(order_by){
            sort[order_by] = order === OrderEnum.ASC ? 1 : -1
        }
        const pricePipeline: PipelineStage[] =  [
            {
                $match: filter,
            },
            {
                $addFields: {
                    normalizedToUSD: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$currency", "UAH"] },
                                    then: {
                                        $divide: [
                                            "$price",
                                            { $toDouble: "$exchange_rate.USD.sale" }
                                        ]
                                    }
                                },
                                {
                                    case: { $eq: ["$currency", "EUR"] },
                                    then: {
                                        $divide: [
                                            {
                                                $multiply: [
                                                    "$price",
                                                    { $toDouble: "$exchange_rate.EUR.buy" }
                                                ]
                                            },
                                            { $toDouble: "$exchange_rate.USD.sale" }
                                        ]
                                    }
                                }
                            ],
                            default: "$price"
                        }
                    }
                }
            },
            {
                $sort: {normalizedToUSD: sort["price"]}
            },
            {
                $project: {
                    normalizedToUSD: 0
                }
            }
        ]
        if(order_by === AnnouncementOrderByEnum.PRICE){
            return await Promise.all([Announcement.aggregate(pricePipeline).limit(limit).skip((page-1)*limit + skip), Announcement.countDocuments(filter)])

        }
        return await Promise.all([Announcement.find(filter).sort(sort).limit(limit).skip((page-1)*limit + skip), Announcement.countDocuments(filter)])
    }

    public async get(id: string): Promise<AnnouncementType | null>{
        return await Announcement.findById(id)
    }

    public async create(dto: CreateAnnouncementInRepositoryDTOType): Promise<AnnouncementType>{
        return await Announcement.create(dto)
    }

    public async delete(id: string): Promise<AnnouncementType | null>{
        return await Announcement.findByIdAndDelete(id)
    }

    public async update(id: string, dto: UpdateAnnouncementDTOType): Promise<AnnouncementType | null>{
        return await Announcement.findByIdAndUpdate(id, dto, {new: true})
    }

    public async findByVehicleId(id: string): Promise<AnnouncementType| null>{
        return await Announcement.findOne({vehicle_id: id})
    }

    public async findByParams(params: FilterQuery<AnnouncementType>): Promise<AnnouncementType[] | null> {
        return await Announcement.find(params)
    }

    public async joinOnVehicle(): Promise<Aggregate<AnnouncementJoinVehicleType[]>>{
        return await Announcement.aggregate().lookup({from: Vehicle.collection.name, localField: 'vehicle_id', foreignField: '_id', as: 'vehicle'})
    }

}

export const announcementRepository = new AnnouncementRepository()