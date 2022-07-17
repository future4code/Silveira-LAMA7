import { photoInputDTO } from "../controller/interfaces/PhotoInputDTO";
import { GalleryDatabase } from "../data/GalleryDatabase";
import { CustomError } from "./errors/CustomError";

export class GalleryBusiness {
    constructor(
        private galleryDatabase: GalleryDatabase,
    ) { }

    public postPhoto = async (input: photoInputDTO) => {
        try {
            const { photo } = input
            if (!photo) {
                throw new CustomError(400, "Parâmetros faltando")
            }

            const newPhoto: photoInputDTO = {
                photo
            }
            
            await this.galleryDatabase.postPhoto(newPhoto)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}