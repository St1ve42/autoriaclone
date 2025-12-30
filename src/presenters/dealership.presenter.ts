import {DealershipType} from "../types/DealershipType.ts";

class DealershipPresenter{
    public listRes(dealership: DealershipType[]){
        return dealership.map(this.res)
    }

    public res(dealership: DealershipType){
        return {
            id: dealership._id,
            name: dealership.name,
            description: dealership.description,
            address: dealership.address,
            phone: dealership.phone,
            email: dealership.email,
            owner_id: dealership.owner_id,
            website: dealership.website,
            is_verified: dealership.is_verified,
            rating: dealership.rating,
            logo: dealership.logo,
        }
    }
}

export const dealershipPresenter = new DealershipPresenter()