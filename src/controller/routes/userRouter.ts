import express from "express";

import { Authenticator } from "../../business/services/Authenticator";
import { HashManager } from "../../business/services/HashManager";
import { IdGenerator } from "../../business/services/IdGenerator";
import { UserBusiness } from "../../business/UserBusiness";

import { UserDatabase } from "../../data/UserDatabase";

import { UserController } from "../userController";

export const userRouter = express.Router();

const userBusiness = new UserBusiness(
    new UserDatabase,
    new IdGenerator,
    new HashManager,
    new Authenticator
);

const userController = new UserController(userBusiness);

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.logIn);
