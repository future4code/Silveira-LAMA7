import express from "express";
import { Authenticator } from "../../business/services/Authenticator";
import { IdGenerator } from "../../business/services/IdGenerator";
import { ShowBusiness } from "../../business/ShowBusiness";
import { ShowDatabase } from "../../data/ShowDatabase";
import { ShowController } from "../ShowController";

export const showRouter = express.Router();

const showBusiness = new ShowBusiness(
    new Authenticator,
    new IdGenerator,
    new ShowDatabase
);

const showController = new ShowController(showBusiness)

showRouter.post("/create", showController.createShow);
showRouter.get("/info/:id", showController.getShowById)