import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), '.env') });
import fs from "fs/promises";
import path from "path";
import mongoose, { Types } from "mongoose";
import {Vehicle} from "../src/models/mongoose/vehicle.model.ts";
import type {OldModelType, OldVehicleType, VehicleType} from "../src/types/VehicleType.ts";
import {configs} from "../src/configs/configs.ts";

const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(configs.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

const transformAndSeedData = async () => {
    const filePath = path.join(process.cwd(), "src", "externalData", "makes_and_models.json");

    try {
        await fs.access(filePath);
    } catch (e) {
        console.error(`Source file not found at ${filePath}`);
        return;
    }

    console.log("Reading raw data...");
    const rawData: OldVehicleType[] = JSON.parse(await fs.readFile(filePath, { encoding: "utf8" }));

    const newData: VehicleType[] = [];

    console.log("Transforming data...");
    for (const vehicle of rawData) {
        const transformedData = {
            make_name: vehicle.make_name,
            models: Object.values(vehicle.models).map((model: OldModelType) => {
                const { model_id, ...restModel } = model;
                return {
                    _id: new Types.ObjectId(),
                    ...restModel
                };
            })
        } as unknown as VehicleType;

        newData.push(transformedData);
    }
    console.log(`Prepared ${newData.length} vehicles for insertion.`);

    try {
        await Vehicle.insertMany(newData);
        console.log("Data successfully seeded into MongoDB!");
    } catch (error) {
        console.error("Error seeding data:", error);
    }
};

const run = async () => {
    await connectDB();
    await transformAndSeedData();

    await mongoose.connection.close();
    console.log("Connection closed.");
};

await run();