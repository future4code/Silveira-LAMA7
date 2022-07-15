import { CustomError } from "../business/errors/CustomError";
import { Show } from "../business/models/ShowModel";
import { Database } from "./Database";

export class ShowDatabase extends Database {
    private TABLE_NAME = "Lama7_Shows"

    async createShow(newShow: Show): Promise<void> {
        try {
            await Database.connection(this.TABLE_NAME)
                .insert({
                    newShow
                })
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }

    async alreadyExist(week_day: string, start_time: number): Promise<any> {
        const result = await Database.connection(this.TABLE_NAME)
            .select("*")
            .where({
                week_day: week_day,
                start_time: start_time
            })
        return result
    }
}