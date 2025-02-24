import { Request, Response } from "express";
import asyncHandler from "../../global/utils/asyncHandler";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { RegisterSchema, RegisterStatus } from "./register.schema";
import { z } from "zod";

const FILE_PATH = path.resolve(__dirname, "../../services.json")

type RegisterPayload = z.infer<typeof RegisterSchema>;

export const readFileData = async () => {
    const data = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

export const registerService = asyncHandler(async (req: Request, res: Response) => {
    const data = await readFileData();
    const services: RegisterPayload[] = data || [];
    const payload: RegisterPayload = req.body;

    const updatedServices = services.length > 0 ? services.map((e) => {
        console.log('1')
        if (e?.serviceName === payload.serviceName) {
            console.log('2')
            return {
                "serviceName": payload.serviceName,
                "host": payload.host,
                "port": payload.port,
                "type": payload.type,
                "status": RegisterStatus.UP
            }
        }
        console.log('3')
        return payload;
    }) : [payload];

    await writeFile(FILE_PATH, JSON.stringify(updatedServices, null, 2));
    res.json({ message: "File read successfully", data: services });
})