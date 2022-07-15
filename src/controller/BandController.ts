import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { bandInfoDTO } from "./interfaces/BandInfoDTO";

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

    public getBandInfo = async (req: Request, res: Response) => {
        try {
            const bandName = req.params.name
            const token = String(req.headers.auth)

            const input: bandInfoDTO = {
                bandName
            }

            const bandInfo = await this.bandBusiness.getBandInfo(input,token)
            res.status(201).send(bandInfo)

        } catch (error: any) {
            res.status( error.statusCode || 400 ).send(error.message)
        }

    }

    
}