import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { readFile } from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve(__dirname, "../services.json")
const preData = [
    {
        id: 1,
        name: 'one'
    },
    {
        id: 2,
        name: 'two'
    },
    {
        id: 3,
        name: 'three'
    },
]

export const readFileData = async () => {
    const data = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

export const registerService = asyncHandler(async (req: Request, res: Response) => {
    const data = await readFileData();
    const services = data.services;
    const updatedServices = [...services, ...preData];


    res.json({ message: "File read successfully", data: services });
})