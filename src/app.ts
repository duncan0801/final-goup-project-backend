const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
import { Request, Response } from "express-serve-static-core";

declare global {
  namespace Express {
    interface Request {
      currentUserId: number;
    }
  }
}

//Import Routes
import usersRouter from "./resources/users/router";
import counsellorRouter from "./resources/counsellors/router";
import messagesRouter from "./resources/messages/router";
import faqRouter from "./resources/faq/router";
import servicesRouter from "./resources/services/router";
import reviewsRouter from "./resources/reviews/router";
import appointmentsRouter from "./resources/appointments/router";

import authRouter from "./resources/auth/router";
import loginAuth from "./middlewares/loginAuth";
import { JwtPayload } from "jsonwebtoken";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors({ origin: "https://distracted-sammet-a52dfe.netlify.app", credentials: true }));
app.use(cookieParser());

//Routes
app.use(authRouter);
app.use("/user", usersRouter);
app.use("/faq", faqRouter);
app.use("/services", servicesRouter);
app.use("/counsellors", counsellorRouter);
app.use("/reviews", reviewsRouter);
app.use(loginAuth);
app.use("/appointments", appointmentsRouter);
app.use("/messages", messagesRouter);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json("No route match");
});

module.exports = app;
