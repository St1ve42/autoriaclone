import {BaseType} from "./BaseType.ts";

type OldModelType = {
  model_id: number;
  model_name: string;
  model_styles: {};
  vehicle_type: string;
  years: number[];
}

type OldVehicleType = {
  first_year: number;
  last_year: number;
  make_id: number;
  make_name: string;
  make_slug: string;
  models: {[key: string]: OldModelType};
} & BaseType

type ModelType = {
    _id: string;
    model_name: string;
    model_styles: {};
    vehicle_type: string;
    years: number[];
}

type VehicleType = Pick<OldVehicleType, "_id" | "first_year" | "last_year" | "make_name" | "make_slug"> & {models: ModelType[]}

type MakeType = Pick<VehicleType, "_id" | "make_name" | "make_slug">
type ModelListType = Pick<VehicleType, "make_name"> & {models: Pick<ModelType, "_id" | "model_name">[]}
type ModelResponseType =  Pick<VehicleType, "make_name"> & {model: ModelType}

export type {VehicleType, OldModelType, OldVehicleType, ModelType, MakeType, ModelListType, ModelResponseType}