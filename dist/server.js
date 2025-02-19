"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const register_route_1 = __importDefault(require("./routes/register.route"));
dotenv_1.default.config({ path: 'dev.env' });
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use('/api/registers', register_route_1.default);
// app.get("/", asyncHandler((req: Request, res: Response) => res.send("Hii ")));
app.listen(PORT, () => console.log('Server started on port: ', PORT));
