import {DealershipCreateWithOwnerIdDTOType, DealershipType, DealershipUpdateWithInputDTOType, DealershipUpdateWithoutInputDTOType} from "../types/DealershipType.ts";
import {Dealership} from "../models/mongoose/dealership.model.ts";

class DealershipRepository{
    public async create(dto: DealershipCreateWithOwnerIdDTOType): Promise<DealershipType>{
        return await Dealership.create(dto)
    }

    public async get(id: string): Promise<DealershipType | null>{
        return await Dealership.findById(id)
    }

    public async getList(): Promise<DealershipType[]>{
        return await Dealership.find({})
    }

    public async findByParams(params: DealershipUpdateWithoutInputDTOType): Promise<DealershipType[]>{
        return await Dealership.find(params)
    }

    public async update(id: string, dto: DealershipUpdateWithoutInputDTOType): Promise<DealershipType | null>{
        return await Dealership.findByIdAndUpdate(id, dto, {new: true})
    }

    public async delete(id: string): Promise<DealershipType | null>{
        return await Dealership.findByIdAndDelete(id)
    }

}

export const dealershipRepository = new DealershipRepository()