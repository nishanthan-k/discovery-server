import { Request, Response } from "express";
import asyncHandler from "../global/utils/asyncHandler";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve(__dirname, "../services.json")
enum RegisterStatus {
    UP = "UP",
    DOWN = "DOWN"
}
interface RegisterPayload {
    serviceName: string
    host: string
    port: string
    type: string
    access: string
    status?: RegisterStatus
}
// const preData = [
//     {
//         "serviceName": "public-api-gateway",
//         "host": "localhost",
//         "port": 8080,
//         "type": "microservice",
//         "access": "global",
//     },
//     {
//         "serviceName": "user-service",
//         "host": "localhost",
//         "port": 8081,
//         "type": "microservice",
//         "access": "public",
//         "tags": ["auth", "user"],
//         "gateways": ["public-api-gateway"]
//     }      
// ]

export const readFileData = async () => {
    const data = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

export const registerService = asyncHandler(async (req: Request, res: Response) => {
    const data = await readFileData();
    const services: RegisterPayload[] = data || [];
    const payload: RegisterPayload = req.body;
    console.log(data)
    console.log(req.body)
    const updatedServices = services.length > 0 ? services.map((e) => {
        console.log('1')
        if (e?.serviceName === payload.serviceName) {
            console.log('2')
            return {
                "serviceName": payload.serviceName,
                "host": payload.host,
                "port": payload.port,
                "type": payload.type,
                "access": payload.access,
                "status": RegisterStatus.UP
            }
        }
        console.log('3')
        return payload;
    }) : [payload];

    await writeFile(FILE_PATH, JSON.stringify(updatedServices, null, 2));
    res.json({ message: "File read successfully", data: services });
})