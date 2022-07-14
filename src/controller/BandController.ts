import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";

import { bandSignupDTO } from "./interfaces/BandSignupDTO";

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ){}

    public signupBand = async (req: Request, res: Response) => {
        try {
            const { name, musicalGenre, responsible } = req.body
            const token = String(req.headers.auth)

            const input: bandSignupDTO = {
                name,
                musicalGenre,
                responsible
            }

            await this.bandBusiness.signupBand(input,token)
            res.status(201).send("Banda cadastrada com sucesso")

        } catch (error: any) {
            res.status( error.statusCode || 400 ).send(error.message)
        }

    }

    
}