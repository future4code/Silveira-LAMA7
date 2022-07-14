import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserLoginDTO, UserSignUpDTO } from "./interfaces/User";

export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ) {};

    public signUp = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password, role } = req.body;

            const newUser: UserSignUpDTO = {
                name,
                email,
                password,
                role
            };

            const token: string = await this.userBusiness.createUser(newUser);

            res.status(201).send({ 
                message: "Usuário cadastrado com sucesso",
                token
             });

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.message });
        }
    };

    public logIn = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            const userLogin: UserLoginDTO = {
                email,
                password
            };

            const token: string = await this.userBusiness.logInUser(userLogin);

            res.status(200).send({ token });
            
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ error: error.message });
        }
    };
};