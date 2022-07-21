import { UserLoginDTO, UserSignUpDTO } from "../controller/interfaces/User";
import { User } from "./models/User";

import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "./errors/CustomError";

import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {};

    public createUser = async (user: UserSignUpDTO): Promise<string> => {
        const { email, name, password, role } = user;

        if (
            !email ||
            !name ||
            !password ||
            !role
        ) {
            throw new CustomError(400, "Preencha os campos corretamente");
        }

        if (email.indexOf("@") === -1) {
            throw new CustomError(400, "Sintaxe de email inválido");
        }

        if (password.length < 6) {
            throw new CustomError(400, "Senha deve conter 6+ caractéres");
        }

        if (role !== "NORMAL" && role !== "ADMIN") {
            throw new CustomError(400, "Função de usuário deve ser 'NORMAL' ou 'ADMIN'");
        }

        const emailAlreadySigned: string = await this.userDatabase.selectUserEmail(email);

        if (emailAlreadySigned) {
            throw new CustomError(422, "Email já cadastrado no sistema");
        }

        const id: string = this.idGenerator.generateId();
        const hashPassword = await this.hashManager.generateHash(password);

        const newUser: User = new User(
            id,
            name,
            email,
            hashPassword,
            User.stringToUserRole(role)
        );

        await this.userDatabase.insertUser(newUser);

        const token: string = this.authenticator.generateToken({ id, role });

        return token;
    };

    public logInUser = async (userLogin: UserLoginDTO): Promise<string> => {
        const { email, password } = userLogin;

        if (!email || !password) {
            throw new CustomError(400, "Preencha os campos corretamente");
        }

        if (email.indexOf("@") === -1) {
            throw new CustomError(400, "Sintaxe de email inválido");
        }

        const user: User = await this.userDatabase.selectUserByEmail(email);

        if (!user) {
            throw new CustomError(400, "Email de usuário inválido");
        }

        const isUserPasswordCorrect = this.hashManager.compareHash(password, user.password);

        if (!isUserPasswordCorrect) {
            throw new CustomError(403, "Senha de usuário incorreta");
        }

        const token: string = this.authenticator.generateToken({ 
            id: user.id,
            role: user.role
        });

        return token;
    };
};

