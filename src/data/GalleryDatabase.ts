import { CustomError } from "../business/errors/CustomError"
import { photoInputDTO } from "../controller/interfaces/PhotoInputDTO"
import { Database } from "./Database"

export class GalleryDatabase extends Database {
    private TABLE_NAME = "Lama7_Gallery"

    public postPhoto = async (newPhoto: photoInputDTO) => {
        try {
            await Database.connection(this.TABLE_NAME)
                .insert({
                    photo: newPhoto
                })
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }

    }

    public getPhoto = async () => {
        try {
            const [result] = await Database.connection(this.TABLE_NAME)
                .select("*")
            return result
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
} 