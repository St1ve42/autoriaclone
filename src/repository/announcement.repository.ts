import {Announcement} from "../models/mongoose/announcement.model.ts";
import {AnnouncementType, CreateAnnouncementInRepositoryDTOType, UpdateAnnouncementDTOType} from "../types/AnnouncementType.ts";
import {FilterQuery, PipelineStage, UpdateQuery} from "mongoose";
import {AnnouncementQueryType} from "../types/QueryType.ts";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.ts";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {AnnouncementListReturnType} from "../types/ListReturnType.ts";

class AnnouncementRepository{
    public async getList(query: AnnouncementQueryType, filterInput?: Partial<AnnouncementType> & {dealership_id?: string}): Promise<AnnouncementListReturnType>{
        const {page, limit, skip, searchBy, search, orderBy, order, rangeBy, from, to} = query
        let filter: FilterQuery<AnnouncementType> = {}
        let sort: {[key: string]: 1 | -1} = {}
        if(filterInput){
            Object.entries(filterInput).forEach(([key,value]) => {
                filter[key] = value
            })
        }
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
        if(orderBy === AnnouncementOrderByEnum.PRICE){
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
                },
                {
                    $lookup: {
                        from: "dealerships",
                        localField: "dealership_id",
                        foreignField: "_id",
                        as: "dealership"
                    }
                }
            ]
            return await Promise.all([Announcement.aggregate(pricePipeline).limit(limit).skip((page-1)*limit + skip), Announcement.countDocuments(filter)])
        }
        return await Promise.all([Announcement.find(filter).sort(sort).limit(limit).skip((page-1)*limit + skip).populate('dealership'), Announcement.countDocuments(filter)])
    }

    public async getAll(): Promise<AnnouncementType[]>{
        return await Announcement.find({}).populate('dealership')
    }

    public async get(id: string): Promise<AnnouncementType | null>{
        return await Announcement.findById(id).populate('dealership') //TODO active announcement can be visible
    }

    public async create(dto: CreateAnnouncementInRepositoryDTOType): Promise<AnnouncementType>{
        const announcement = await Announcement.create(dto) as AnnouncementType
        return await Announcement.findById(announcement._id).populate('dealership') as AnnouncementType
    }

    public async delete(id: string): Promise<AnnouncementType | null>{
        return await Announcement.findByIdAndDelete(id, {new: true}).populate('dealership')
    }

    public async update(id: string, dto: UpdateAnnouncementDTOType): Promise<AnnouncementType | null>{
        const {vehicle, images, ...rest} = dto
        const update: Required<Pick<UpdateQuery<AnnouncementType>, "$set">> = {$set: rest}
        if(vehicle){
            Object.entries(vehicle).forEach(([key, value]) => {
                update.$set[`vehicle.${key}`] = value
            })
        }
        return await Announcement.findByIdAndUpdate(id, update, {new: true}).populate('dealership')
    }

    public async updateImages(id: string, imagePaths: string[], action: "upload" | "delete"): Promise<AnnouncementType | null>{
        const update: Pick<UpdateQuery<AnnouncementType>, "$push" | "$pull">  = {}
        switch(action){
            case "upload":
                update.$push = {images: {$each: imagePaths}}
                break
            case "delete":
                update.$pull = {images: {$in: imagePaths}}
                break
        }
        return await Announcement.findByIdAndUpdate(id, update, {new: true})
    }

    public async findByParams(params: FilterQuery<AnnouncementType> & {dealership_id?: string}): Promise<AnnouncementType[]> {
        return await Announcement.find(params).populate('dealership')
    }

}

export const announcementRepository = new AnnouncementRepository()

