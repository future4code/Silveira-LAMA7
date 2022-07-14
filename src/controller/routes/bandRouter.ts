import express from "express";
import { BandBusiness } from "../../business/BandBusiness";
import { Authenticator } from "../../business/services/Authenticator";
import { HashManager } from "../../business/services/HashManager";
import { IdGenerator } from "../../business/services/IdGenerator";
import { BandDataBase } from "../../data/BandDataBase";
import { BandController } from "../BandController";

export const bandRouter = express.Router()
const bandController = new BandController(
    new BandBusiness(
        new Authenticator(),
        new BandDataBase(),
        new HashManager(),
        new IdGenerator()
    )
)

bandRouter.post("/signup", bandController.signupBand)

