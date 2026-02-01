import {ReportedVehicleType} from "../types/ReportedVehicleType.ts";
import {BaseQueryType} from "../types/QueryType.ts";
import {userService} from "../services/user.service.ts";
import {userPresenter} from "./user.presenter.ts";

class ReportedVehiclePresenter{
    private async list(reportedVehicles: ReportedVehicleType[], total: number, query: BaseQueryType, res: (reportedVehicles: ReportedVehicleType) => unknown){
        return {
            data: await Promise.all(reportedVehicles.map(res)),
            total,
            ...query
        }
    }

    public async staffList(reportedVehicles: ReportedVehicleType[], total: number, query: BaseQueryType){
        return await this.list(reportedVehicles, total, query, this.staffRes)
    }

    public async staffRes(reportedVehicle: ReportedVehicleType){
        const {_id, make_name, model, createdAt, updatedAt, user_id} = reportedVehicle
        const user = await userService.get(user_id)
        return {
            id: _id,
            make_name,
            model,
            user: userPresenter.publicRes(user),
            createdAt,
            updatedAt
        }
    }

    public userRes(reportedVehicle: ReportedVehicleType){
        const {_id, make_name, model} = reportedVehicle
        return {
            id: _id,
            make_name,
            model
        }
    }
}

export const reportedVehiclePresenter = new ReportedVehiclePresenter()