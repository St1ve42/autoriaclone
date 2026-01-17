import {Vehicle} from "../models/mongoose/vehicle.model.ts";
import type {MakeType, ModelListType, ModelType, VehicleType, ModelResponseType} from "../types/VehicleType.ts";
import {BaseQuery} from "../types/QueryType.ts";
import {PipelineStage} from "mongoose";
import {ObjectId} from "mongodb";

class VehicleRepository{
    public async getMakeList(query: BaseQuery): Promise<[MakeType[], number]>{
        const {page, limit, skip} = query
        return await Promise.all([await Vehicle.find({}, {"_id": 1, "make_name": 1, "make_slug": 1}).skip((page-1)*limit + skip).limit(limit), await Vehicle.countDocuments({})])
    }

    public async getModels(makeId: string, query: BaseQuery): Promise<[ModelListType, number]> {
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
                            in: {_id: "$$model._id", model_name: "$$model.model_name"}
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
                                cond: { $eq: ["$$model._id", modelId] }
                            }
                        }
                    }
                }
            },
            {
                $unset: ["_id"]
            }
        ]
        const modelResponse: ModelResponseType & Partial<ModelResponseType, "model"> = (await Vehicle.aggregate(pipeline))[0]
        return !!modelResponse.model
    }

    public async getModel(makeId: string, modelId: string, query: BaseQuery): Promise<[ModelResponseType, number]>{
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
                                cond: { $eq: ["$$model._id", modelId] }
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


}

//TODO id for nested object
//TODO get years using model_id
//TODO think about vehicle list information

export const vehicleRepository = new VehicleRepository()