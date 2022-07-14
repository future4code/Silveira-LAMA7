import { USER_ROLES } from "../../controller/interfaces/User";
import { CustomError } from "../errors/CustomError";

export class User {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: USER_ROLES
    ) {};

    public static toUserModel = (user: any): User => {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role
        );
    };

    public static stringToUserRole = (input: string): USER_ROLES => {
        switch(input) {
            case "NORMAL":
                return USER_ROLES.NORMAL;
            case "ADMIN":
                return USER_ROLES.ADMIN;
            default:
                throw new CustomError(422, "Função de usuário inválido");
        }; 
    };
};