import mongoose from "mongoose";
import { CurrencyEnum } from "../../enums/currency.enum.ts";
export declare const Announcement: mongoose.Model<{
    city: string;
    currency: CurrencyEnum;
    is_active: boolean;
    user_id: string;
    region: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    currency_value: number;
    rate_source: string;
    approve_attempts: string;
    vehicle_id: string;
    rate_date?: NativeDate | null;
    dealershipId?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    city: string;
    currency: CurrencyEnum;
    is_active: boolean;
    user_id: string;
    region: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    currency_value: number;
    rate_source: string;
    approve_attempts: string;
    vehicle_id: string;
    rate_date?: NativeDate | null;
    dealershipId?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    city: string;
    currency: CurrencyEnum;
    is_active: boolean;
    user_id: string;
    region: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    currency_value: number;
    rate_source: string;
    approve_attempts: string;
    vehicle_id: string;
    rate_date?: NativeDate | null;
    dealershipId?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    city: string;
    currency: CurrencyEnum;
    is_active: boolean;
    user_id: string;
    region: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    currency_value: number;
    rate_source: string;
    approve_attempts: string;
    vehicle_id: string;
    rate_date?: NativeDate | null;
    dealershipId?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    city: string;
    currency: CurrencyEnum;
    is_active: boolean;
    user_id: string;
    region: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    currency_value: number;
    rate_source: string;
    approve_attempts: string;
    vehicle_id: string;
    rate_date?: NativeDate | null;
    dealershipId?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    city: string;
    currency: CurrencyEnum;
    is_active: boolean;
    user_id: string;
    region: string;
    title: string;
    description: string;
    images: string[];
    price: number;
    currency_value: number;
    rate_source: string;
    approve_attempts: string;
    vehicle_id: string;
    rate_date?: NativeDate | null;
    dealershipId?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=announcement.model.d.ts.map