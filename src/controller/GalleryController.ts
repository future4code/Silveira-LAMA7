import { Request, Response } from "express";
import { GalleryBusiness } from "../business/GalleryBusiness";
import { photoInputDTO } from "./interfaces/photoInputDTO";

export class GalleryControler {
    constructor(
        private galleryBusiness: GalleryBusiness
    ) { }

    public postPhoto = async (req: Request, res: Response) => {
        try {
            const photo = req.body

            const input: photoInputDTO = {
                photo
            }

            await this.galleryBusiness.postPhoto(input)
            res.status(201).send({ message: "Foto publicada na galeria oficial do evento" })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }
}