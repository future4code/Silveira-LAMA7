import { AuthenticationData } from "../controller/interfaces/Authenticator";
import { ShowDatabase } from "../data/ShowDatabase";
import { CustomError } from "./errors/CustomError";
import { ShowInputDTO } from "./models/ShowModel";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class ShowBusiness {
    constructor(
        private authenticator: Authenticator,
        private hashManager: HashManager,
        private idGenerator: IdGenerator,
        private showDatabase: ShowDatabase
    ) { }

    async createShow(input: ShowInputDTO, token: string) {
        try {
            const { week_day, start_time, end_time, band_id } = input

            if (!token) {
                throw new CustomError(401, "Não autorizado")
            }

            const tokenData = this.authenticator.getTokenData(token)

            if (tokenData.role !== "ADMIN") {
                throw new CustomError(3,"")
            }

            if (!week_day || !start_time || !end_time || !band_id) {
                throw new CustomError(422, "Preencha os campos corretamente")
            }
        } catch (error: any) {
            throw new Error("Erro ao registrar show - business1")
        }
    }
}