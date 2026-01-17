import type {OldVehicleType} from "../types/VehicleType.ts";
import {VehicleQueryType} from "../types/QueryType.ts";

class VehiclePresenter{
    public list(
        vehicles: OldVehicleType[],
        total: number,
        query: VehicleQueryType
    ) {
        return {
            data: vehicles.map(this.res),
            total,
            ...query
        }
    }

    public res(vehicle: OldVehicleType){
        return {
            id: vehicle._id,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            vehicle_type: vehicle.vehicle_type,
            mileage: vehicle.mileage,
            characteristics: vehicle.characteristics //fix
        }
    }

}

export const vehiclePresenter = new VehiclePresenter();