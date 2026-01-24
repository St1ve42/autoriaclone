import {DealershipCreateWithOwnerIdDTOType, DealershipType, DealershipUpdateWithoutInputDTOType} from "../types/DealershipType.ts";
import {Dealership} from "../models/mongoose/dealership.model.ts";
import {DealershipQueryType} from "../types/QueryType.ts";
import {FilterQuery} from "mongoose";
import {OrderEnum} from "../enums/generalEnums/order.enum.ts";
import {SortQuery} from "../types/SortQuery.ts";
import {DealershipOrderByEnum} from "../enums/dealershipEnums/dealership.orderBy.enum.ts";

class DealershipRepository{
    public async getList(query: DealershipQueryType): Promise<[DealershipType[], number]>{
        const {page, limit, skip, searchBy, search, orderBy, order} = query
        let filter: FilterQuery<DealershipType> = {}
        let sort: SortQuery<typeof DealershipOrderByEnum> = {}
        if(search && searchBy){
            filter[searchBy] = {$regex: search, $options: "i"}
        }
        if(orderBy){
            sort[orderBy] = order === OrderEnum.ASC ? 1 : -1
        }
        return await Promise.all([Dealership.find(filter).sort(sort).limit(limit).skip((page-1)*limit + skip), Dealership.countDocuments(filter)])
    }

    public async create(dto: DealershipCreateWithOwnerIdDTOType): Promise<DealershipType>{
        return await Dealership.create(dto)
    }

    public async get(id: string): Promise<DealershipType | null>{
        return await Dealership.findById(id)
    }

    public async findOneByParams(params: DealershipUpdateWithoutInputDTOType): Promise<DealershipType | null>{
        return await Dealership.findOne(params)
    }

    public async update(id: string, dto: DealershipUpdateWithoutInputDTOType): Promise<DealershipType | null>{
        return await Dealership.findByIdAndUpdate(id, dto, {new: true})
    }

    public async delete(id: string): Promise<DealershipType | null>{
        return await Dealership.findByIdAndDelete(id)
    }

}

export const dealershipRepository = new DealershipRepository()