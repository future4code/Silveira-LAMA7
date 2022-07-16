import { CustomError } from "../business/errors/CustomError"
import { photoInputDTO } from "../controller/interfaces/photoInputDTO"
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
} 