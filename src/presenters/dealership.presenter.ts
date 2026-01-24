import {DealershipType} from "../types/DealershipType.ts";
import {userService} from "../services/user.service.ts";
import {userPresenter} from "./user.presenter.ts";
import {DealershipQueryType} from "../types/QueryType.ts";

class DealershipPresenter{
    public async list(dealerships: DealershipType[],  total: number, query: DealershipQueryType){
        return {
            data: await Promise.all(dealerships.map(this.res)),
            total,
            ...query
        }
    }

    public async res(dealership: DealershipType){
        const user = await userService.get(dealership.owner_id)
        return {
            id: dealership._id,
            name: dealership.name,
            description: dealership.description,
            address: dealership.address,
            phone: dealership.phone,
            email: dealership.email,
            owner: userPresenter.publicRes(user),
            website: dealership.website,
            is_verified: dealership.is_verified,
            rating: dealership.rating,
            logo: dealership.logo,
        }
    }
}

export const dealershipPresenter = new DealershipPresenter()