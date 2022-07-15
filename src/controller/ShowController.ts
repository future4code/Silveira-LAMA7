import { Request, Response } from "express";
import { ShowInputDTO } from "../business/models/ShowModel";
import { ShowBusiness } from "../business/ShowBusiness";

export class ShowController {
    constructor(
        private showBusiness: ShowBusiness
    ) { }

    public createShow = async (req: Request, res: Response) => {
        try {
            const { weekDay, startTime, endTime, bandId } = req.body

            const input: ShowInputDTO = {
                week_day: weekDay,
                start_time: startTime,
                end_time: endTime,
                band_id: bandId
            }

            const token = req.headers.auth as string

            await this.showBusiness.createShow(input, token)
            res.status(201).send({ message: "Sucesso!! Show registrado" })
        } catch (error: any) {
            res.status(500).send(error.sqlMessage || error.message);
        }
    }
}