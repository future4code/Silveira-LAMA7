import express from "express";
import { BandBusiness } from "../../business/BandBusiness";
import { Authenticator } from "../../business/services/Authenticator";
import { HashManager } from "../../business/services/HashManager";
import { IdGenerator } from "../../business/services/IdGenerator";
import { BandDataBase } from "../../data/BandDataBase";
import { BandController } from "../BandController";

export const bandRouter = express.Router()

const userBusiness = new BandBusiness(
    new Authenticator(),
    new BandDataBase(),
    new HashManager(),
    new IdGenerator()
)

const bandController = new BandController(userBusiness)

bandRouter.post("/signup", bandController.signupBand)

