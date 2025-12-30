import {BaseType} from "./BaseType.ts";

type DealershipType = {
    _id: string,
    name: string,
    description?: string,
    address: string,
    phone: string,
    email: string,
    owner_id: string,
    website?: string,
    is_verified: boolean,
    rating: number,
    logo?: string | null,
} & BaseType

type DealershipCreateWithInputDTOType = Pick<DealershipType, "name" | "description" | "address"| "phone" | "email" | "website">
type DealershipCreateWithOwnerIdDTOType = DealershipCreateWithInputDTOType & {owner_id: string}
type DealershipUpdateWithInputDTOType = Partial<Pick<DealershipType, "name" | "description" | "address" | "website" | "logo">>
type DealershipUpdateWithoutInputDTOType = Partial<DealershipType>


export type {DealershipType, DealershipCreateWithInputDTOType, DealershipCreateWithOwnerIdDTOType, DealershipUpdateWithInputDTOType, DealershipUpdateWithoutInputDTOType}