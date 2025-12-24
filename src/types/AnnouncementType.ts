import {CurrencyEnum} from "../enums/generalEnums/currency.enum.ts";
import {BaseType} from "./BaseType.ts";
import {ExchangeCurrencyMap} from "./ExchangeCurrencyType.ts";
import {VehicleType} from "./VehicleType.ts";

type AnnouncementType = {
    _id: string
    title: string,
    description: string,
    city: string,
    region: string,
    images?: string[],
    price: number,
    currency: CurrencyEnum,
    exchange_rate: ExchangeCurrencyMap
    rate_source: string
    rate_date: Date,
    approve_attempts: number,
    status: string,
    vehicle_id: string,
    user_id: string,
    dealershipId?: string
} & BaseType

type CreateAnnouncementDTOType = Omit<AnnouncementType, 'user_id' | 'status' | "createdAt" | "updatedAt" | 'approve_attempts' | 'rate_date' | 'exchange_rate' | 'rate_source'>
type CreateAnnouncementInRepositoryDTOType =  CreateAnnouncementDTOType & Pick<AnnouncementType, "exchange_rate" | "user_id" | "status" | "approve_attempts">
type UpdateAnnouncementDTOType = Partial<Omit<AnnouncementType, 'user_id' | 'rate_date' | 'exchange_rate' | 'rate_source'>>

export type {AnnouncementType, CreateAnnouncementDTOType, CreateAnnouncementInRepositoryDTOType, UpdateAnnouncementDTOType}