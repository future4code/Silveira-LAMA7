import { bandInfoDTO } from "../controller/interfaces/BandInfoDTO";
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

        const tokenData = this.authenticator.getTokenData(token)

        if(tokenData.role != "ADMIN"){
            throw new CustomError(401,"Ação não autorizada");
        }

        if(!name || !musicalGenre || !responsible){
            throw new CustomError(400,"Campos inválidos");
        }

        const band = await this.bandDataBase.getBandByName(name)

        if(band[0] != undefined){
            throw new CustomError(409,"Banda Já Cadastrada");
        }

        const id = this.idGenerator.generateId()

        await this.bandDataBase.insertBand(input,id)

    }

    public getBandInfo = async (input: bandInfoDTO, token: string) => {
        const bandName = input.bandName

        if(!token){
            throw new CustomError(401,"Acesso não autorizado");
        }

        if(!bandName){
            throw new CustomError(400,"Campos inválidos");
        }

        const bandInfo = await this.bandDataBase.getBandByName(bandName)

        return bandInfo
    }
}