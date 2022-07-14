import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { bandSignupDTO } from "./interfaces/BandSignupDTO";

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ) {}

    public async signupBand(req: Request, res: Response) {
        try {
            const { name, musicalGenre, responsible } = req.body
            const token = String(req.headers.auth)

            const input: bandSignupDTO = {
                name,
                musicalGenre,
                responsible
            }

            this.bandBusiness.signupBand(input,token)
            res.send("Banda cadastrada com sucesso")

        } catch (error: any) {
            res.status(error.statusCode).send(error.message)
        }


    }
}