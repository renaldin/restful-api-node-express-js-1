import express from "express";
import { publicRouter } from "../route/PublicApi.js";
import { errorMiddleware } from "../middleware/ErrorMiddleware.js";
import { userRouter } from "../route/Api.js";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
