import { bandSignupDTO } from "../controller/interfaces/BandSignupDTO";
import { BandDataBase } from "../data/BandDataBase";
import { CustomError } from "./errors/CustomError";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class BandBusiness {
    constructor(
        private authenticator: Authenticator,
        private bandDataBase: BandDataBase,
        private hashManager: HashManager,
        private idGenerator: IdGenerator

    ){}

    public signupBand = async (input: bandSignupDTO, token: string) => {
        const { name, musicalGenre, responsible } = input

        if(!token){
            throw new CustomError(401,"Acesso não autorizado");
        }

        // faltado a validação de se o usuário é administrador
        const tokenData = this.authenticator.getTokenData(token)

        if(!name || !musicalGenre || !responsible){
            throw new CustomError(400,"Campos inválidos");
        }

        const id = this.idGenerator.generateId()

        await this.bandDataBase.insertBand(input,id)

    }
}