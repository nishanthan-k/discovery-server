"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = exports.readFileData = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const FILE_PATH = path_1.default.resolve(__dirname, "../services.json");
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
];
const readFileData = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, promises_1.readFile)(FILE_PATH, "utf-8");
    return JSON.parse(data);
});
exports.readFileData = readFileData;
exports.registerService = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, exports.readFileData)();
    const services = data.services;
    const updatedServices = [...services, ...preData];
    res.json({ message: "File read successfully", data: services });
}));
