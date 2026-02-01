import {DealershipMemberType} from "../types/DealershipMemberType.ts";
import {userService} from "../services/user.service.ts";
import {userPresenter} from "./user.presenter.ts";
import {dealerShipService} from "../services/dealership.service.ts";
import {dealershipPresenter} from "./dealership.presenter.ts";
import {DealershipMemberQueryType} from "../types/QueryType.ts";

class DealershipMemberPresenter{
    public async list(dealershipMember: DealershipMemberType[], total: number, query: DealershipMemberQueryType){
        return {
            data: await Promise.all(dealershipMember.map(this.res)),
            total,
            ...query
        }
    }

    public async res(dealershipMember: DealershipMemberType){
        const user = await userService.get(dealershipMember.user_id)
        return {
            id: dealershipMember._id,
            user: userPresenter.publicRes(user),
            role: dealershipMember.role,
            joinedAt: dealershipMember.joinedAt,
        }
    }

    public async resToUser(dealershipMember: DealershipMemberType){
        const dealership = await dealerShipService.get(dealershipMember.dealership_id)
        return {
            id: dealershipMember._id,
            dealership: await dealershipPresenter.res(dealership),
            role: dealershipMember.role,
            joinedAt: dealershipMember.joinedAt,
        }
    }

}

export const dealershipMemberPresenter = new DealershipMemberPresenter()