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
}