import fs from "fs/promises"
import path from "path"
import {OldModelType, OldVehicleType, VehicleType} from "../src/types/VehicleType.ts";
import mongoose, { Types } from "mongoose";
import {exec} from "node:child_process";
import {configs} from "../src/configs/configs.ts";

const newFilePath = path.join(process.cwd(), "src", "externalData", "transformed_makes_and_models.json")
const transformData = async () => {
    const filePath = path.join(process.cwd(), "src", "externalData", "makes_and_models.json")
    const rawData: OldVehicleType[] = JSON.parse(await fs.readFile(filePath, {encoding: "utf8"}))
    const newData: VehicleType[] | [] = []
    for (const vehicle of rawData){
        const transformedData: VehicleType & {_id: mongoose.Types.ObjectId} = {
            ...vehicle,
            make_id: undefined,
            models: Object.values(vehicle.models).map((model: OldModelType) => {
                const {model_id, ...restModel} = model
                return {
                    _id: new Types.ObjectId(),
                    ...restModel
                }
            })
        }
        newData.push(transformedData)
    }
    await fs.writeFile(newFilePath, JSON.stringify(newData))

}

try {
   await fs.readFile(newFilePath)
}
catch (e){
    await transformData()
}

exec(`mongoimport --uri "${configs.MONGO_URI}" -d test -c vehicles --jsonArray --file=${newFilePath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});