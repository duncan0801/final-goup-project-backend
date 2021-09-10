"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
//Import Routes
const router_1 = __importDefault(require("./resources/users/router"));
const router_2 = __importDefault(require("./resources/counsellors/router"));
const router_3 = __importDefault(require("./resources/messages/router"));
const router_4 = __importDefault(require("./resources/faq/router"));
const router_5 = __importDefault(require("./resources/services/router"));
const router_6 = __importDefault(require("./resources/reviews/router"));
const router_7 = __importDefault(require("./resources/appointments/router"));
const router_8 = __importDefault(require("./resources/auth/router"));
const loginAuth_1 = __importDefault(require("./middlewares/loginAuth"));
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
//Routes
app.use(router_8.default);
app.use("/user", router_1.default);
app.use("/faq", router_4.default);
app.use("/services", router_5.default);
app.use("/counsellors", router_2.default);
app.use("/reviews", router_6.default);
app.use(loginAuth_1.default);
app.use("/appointments", router_7.default);
app.use("/messages", router_3.default);
app.all("*", (req, res) => {
    res.status(404).json("No route match");
});
module.exports = app;
