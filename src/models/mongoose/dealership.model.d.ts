import mongoose from "mongoose";
export declare const Dealership: mongoose.Model<{
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    address: string;
    rating: number;
    description?: string | null;
    website?: string | null;
    logo?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    address: string;
    rating: number;
    description?: string | null;
    website?: string | null;
    logo?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
    versionKey: false;
}> & {
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    address: string;
    rating: number;
    description?: string | null;
    website?: string | null;
    logo?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: false;
}, {
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    address: string;
    rating: number;
    description?: string | null;
    website?: string | null;
    logo?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    address: string;
    rating: number;
    description?: string | null;
    website?: string | null;
    logo?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    versionKey: false;
}>> & mongoose.FlatRecord<{
    name: string;
    email: string;
    phone: string;
    is_verified: boolean;
    address: string;
    rating: number;
    description?: string | null;
    website?: string | null;
    logo?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
}>>;
//# sourceMappingURL=dealership.model.d.ts.map