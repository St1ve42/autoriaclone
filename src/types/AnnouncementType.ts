import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import {BaseType} from "./BaseType.ts";
import {ExchangeCurrencyMap} from "./ExchangeCurrencyType.ts";
import {OldVehicleType} from "./VehicleType.ts";
import {DealershipType} from "./DealershipType.ts";
import {AnnouncementVehicleType} from "./AnnouncementVehicleType.ts";

type AnnouncementType = {
    _id: string
    title: string,
    description: string,
    city: string,
    region: number,
    images: string[],
    price: number,
    currency: CurrencyEnum,
    exchange_rate: ExchangeCurrencyMap
    rate_source: string
    rate_date: Date,
    approve_attempts: number,
    status: string,
    vehicle: AnnouncementVehicleType,
    user_id: string,
    dealership?: DealershipType
} & BaseType

type CreateAnnouncementDTOType = Omit<AnnouncementType, 'user_id' | 'status' | "createdAt" | "updatedAt" | 'approve_attempts' | 'rate_date' | 'exchange_rate' | 'rate_source' | 'dealership_id'>
type CreateAnnouncementInRepositoryDTOType =  CreateAnnouncementDTOType & Pick<AnnouncementType, "user_id" | "status" | "approve_attempts"> & {dealership_id?: string} & {exchange_rate: Record<CurrencyEnum, { buy: number, sale: number }>}
type UpdateAnnouncementDTOType = Partial<Omit<AnnouncementType, 'user_id' | 'rate_date' | 'exchange_rate' | 'rate_source' | 'dealership_id'>> & {vehicle?: Partial<AnnouncementVehicleType>}

export type {AnnouncementType, CreateAnnouncementDTOType, CreateAnnouncementInRepositoryDTOType, UpdateAnnouncementDTOType}