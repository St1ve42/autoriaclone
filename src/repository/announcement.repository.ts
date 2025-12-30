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
        const {page, limit, skip, searchBy, search, orderBy, order, rangeBy, from, to} = query
        let filter: FilterQuery<AnnouncementType> = {}
        let sort: {[key: string]: 1 | -1} = {}
        if(search && searchBy){
            filter[searchBy] = {$regex: search, $options: "i"}
        }
        if(rangeBy){
            if(from && !to){
                filter[rangeBy] = {$gte: from}
            }
            else if(!from && to){
                filter[rangeBy] = {$lte: to}
            }
            else if(from && to){
                filter[rangeBy] = {$gte: from, $lte: to}
            }
        }
        if(orderBy){
            sort[orderBy] = order === OrderEnum.ASC ? 1 : -1
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
        if(orderBy === AnnouncementOrderByEnum.PRICE){
            return await Promise.all([Announcement.aggregate(pricePipeline).limit(limit).skip((page-1)*limit + skip), Announcement.countDocuments(filter)])
        }
        return await Promise.all([Announcement.find(filter).sort(sort).limit(limit).skip((page-1)*limit + skip), Announcement.countDocuments(filter)])
    }

    public async getAll(): Promise<AnnouncementType[]>{
        return await Announcement.find({})
    }

    public async get(id: string): Promise<AnnouncementType | null>{
        return await Announcement.findById(id)
    }

    public async create(dto: CreateAnnouncementInRepositoryDTOType): Promise<AnnouncementType>{
        return await Announcement.create(dto)
    }

    public async delete(id: string): Promise<AnnouncementType | null>{
        return await Announcement.findByIdAndDelete(id, {new: true})
    }

    public async update(id: string, dto: UpdateAnnouncementDTOType): Promise<AnnouncementType | null>{
        const {vehicle, ...rest} = dto
        const update: {[key: string]: unknown} = {...rest}
        if(vehicle){
            for(const key in vehicle){
                update[`vehicle.${key}`] = vehicle[key as keyof VehicleType]
            }
        }
        return await Announcement.findByIdAndUpdate(id, {$set: update}, {new: true})
    }

    public async findByParams(params: FilterQuery<AnnouncementType>): Promise<AnnouncementType[]> {
        return await Announcement.find(params)
    }

    public async joinOnVehicle(): Promise<Aggregate<AnnouncementJoinVehicleType[]>>{
        return await Announcement.aggregate().lookup({from: Vehicle.collection.name, localField: 'vehicle_id', foreignField: '_id', as: 'vehicle'})
    }

}

export const announcementRepository = new AnnouncementRepository()

