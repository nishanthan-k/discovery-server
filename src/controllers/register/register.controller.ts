import { Request, Response } from "express";
import asyncHandler from "../../global/utils/asyncHandler";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { RegisterSchema, RegisterStatus } from "./register.schema";
import { z } from "zod";
import { ApiResponse } from "../../global/utils/ApiResponse";
import { ResponseCode } from "../../global/constants/enums/responseEnums";

const FILE_PATH = path.resolve(__dirname, "../../services.json")

type RegisterPayload = z.infer<typeof RegisterSchema>;

export const readFileData = async () => {
    try {
        const data = await readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

export const writeFileData = async (data: any) => {
    await writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};

export const registerService = asyncHandler(async (req: Request, res: Response) => {
    const services = await readFileData();
    const payload: RegisterPayload = req.body;

    services[payload.serviceName] = { ...payload, lastHeartBeat: Date.now(), status: RegisterStatus.UP };

    await writeFileData(services);
    console.log(`Service Registered: ${payload.serviceName}`)
    return ApiResponse.send(res, ResponseCode.OK, "Service registered successfully", services)
})