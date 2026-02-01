import {Vehicle} from "../models/mongoose/vehicle.model.ts";
import type {MakeType, ModelListType, VehicleType, ModelResponseType, ModelType} from "../types/VehicleType.ts";
import {BaseQueryType} from "../types/QueryType.ts";
import {FilterQuery, PipelineStage, UpdateQuery} from "mongoose";
import {ObjectId} from "mongodb";
import {CreateReportedVehicleDTOType, ReportedVehicleModelType, ReportedVehicleType, UpdateReportedVehicleDTOType} from "../types/ReportedVehicleType.ts";

class VehicleRepository{
    public async getMakeList(query: BaseQueryType): Promise<[MakeType[], number]>{
        const {page, limit, skip} = query
        return await Promise.all([await Vehicle.find({}, {"id": "$_id", "make_name": 1, "make_slug": 1, "_id": 0}).skip((page-1)*limit + skip).limit(limit), await Vehicle.countDocuments({})])
    }

    public async getModels(makeId: string, query: BaseQueryType): Promise<[ModelListType, number]> {
        const {limit, skip, page} = query
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    _id: new ObjectId(makeId)
                }
            },
            {
                $addFields: {
                    temp_models: {
                        $map: {
                            input: "$models",
                            as: "model",
                            in: {id: "$$model._id", model_name: "$$model.model_name"}
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    make_name: 1,
                    models: {
                        $slice: ["$temp_models", (page-1)*limit + skip, limit]
                    },
                    total: {$size: "$temp_models"}
                }
            }
        ]
        const {total, ...modelList}: ModelListType & {total: number} = (await Vehicle.aggregate(pipeline))[0]
        return [modelList, total]
    }

    public async isVehicleExists(dto: Pick<CreateReportedVehicleDTOType, "make_name"> & {model?: Partial<ReportedVehicleModelType>}): Promise<boolean>{
        const {make_name, model} = dto
        const filter: FilterQuery<ReportedVehicleType> = {"make_name": make_name}
        if(model){
            const {year, ...restModel} = model
            filter["models"] = {
                $elemMatch: {
                    ...restModel,
                    ...(year ? {years: year} : {})
                }
            }
        }
        return !!(await Vehicle.findOne(filter))
    }

    public async isModelBelongsToMake (makeId: string, modelId: string): Promise<boolean>{
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    _id: new ObjectId(makeId),
                }
            },
            {
                $project: {
                    make_name: 1,
                    model: {
                        $first: {
                            $filter: {
                                input: "$models",
                                as: "model",
                                cond: { $eq: ["$$model._id", new ObjectId(modelId)] }
                            }
                        }
                    }
                }
            },
            {
                $unset: ["_id"]
            }
        ]
        const modelResponse: ModelResponseType & Partial<Pick<ModelResponseType, "model">> = (await Vehicle.aggregate(pipeline))[0]
        return !!modelResponse.model
    }

    public async getModel(makeId: string, modelId: string, query: BaseQueryType): Promise<[ModelResponseType, number]>{
        const {limit, skip, page} = query
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    _id: new ObjectId(makeId),
                }
            },
            {
                $project: {
                    make_name: 1,
                    model: {
                        $first: {
                            $filter: {
                                input: "$models",
                                as: "model",
                                cond: { $eq: ["$$model._id", new ObjectId(modelId)] }
                            }
                        }
                    }
                }
            },
            {
                $set: {
                    "model.years": {$slice: ["$model.years", (page-1)*limit + skip, limit]},
                    "total": {$size: "$model.years"}
                }
            },
            {
                $unset: ["_id", "model._id"]
            }
        ]
        const {total, ...model}: ModelResponseType & {total: number} = (await Vehicle.aggregate(pipeline))[0]
        return [model, total]
    }

    public async getByMakeId(makeId: string): Promise<VehicleType | null>{
        return await Vehicle.findById(makeId)
    }

    public async create(dto: Omit<VehicleType, "_id" | "models"> & {models: Omit<ModelType, "_id">[]}){
        return await Vehicle.create(dto)
    }

    public async update(dto: ReportedVehicleType): Promise<void>{
        const {make_name, model} = dto
        const {year, ...restModel} = model
        let filter: FilterQuery<VehicleType> = {make_name, models: {$elemMatch: restModel}}
        let update: UpdateQuery<VehicleType> = {$addToSet: {"models.$.years": year}}
        const {matchedCount} = await Vehicle.updateOne(filter, update)
        if(matchedCount === 0){
            const defaultData = {
                first_year: 0,
                last_year: 0,
                make_slug: make_name.toLowerCase(),
            };
            filter = {make_name}
            update = {
                $addToSet: {models: {...restModel, years: [year], model_styles: {}}},
                $setOnInsert: {
                    ...defaultData
                }
            }
            await Vehicle.updateOne(filter, update, {upsert: true})
        }
    }

}


export const vehicleRepository = new VehicleRepository()