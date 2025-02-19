"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../controllers/register.controller");
const router = (0, express_1.Router)();
router.get('/', register_controller_1.registerService);
exports.default = router;
