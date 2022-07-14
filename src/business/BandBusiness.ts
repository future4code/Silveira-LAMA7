import { BandDataBase } from "../data/BandDataBase";
import { Authenticator } from "./services/Authenticator";
import { HashManager } from "./services/HashManager";
import { IdGenerator } from "./services/IdGenerator";

export class  BandBusiness {
    constructor(
        private authenticator: Authenticator,
        private bandDataBase: BandDataBase,
        private hashManager: HashManager,
        private idGenerator: IdGenerator
    ){}
}