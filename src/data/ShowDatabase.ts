import { CustomError } from "../business/errors/CustomError";
import { Show, ShowModel } from "../business/models/ShowModel";
import { Database } from "./Database";

export class ShowDatabase extends Database {
    private TABLE_NAME = "Lama7_Shows"

    public createShow = async (newShow: ShowModel): Promise<void> => {
        try {
            await Database.connection(this.TABLE_NAME)
                .insert({
                    id: newShow.id,
                    week_day: newShow.week_day,
                    start_time: newShow.start_time,
                    end_time: newShow.end_time,
                    band_id: newShow.band_id
                })
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }

    public alreadyExist = async (week_day: string, start_time: number): Promise<any> => {
        const [result] = await Database.connection(this.TABLE_NAME)
            .select("*")
            .where({
                week_day: week_day,
                start_time: start_time
            })
        return result
    }
}