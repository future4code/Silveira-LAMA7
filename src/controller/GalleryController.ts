import { Request, Response } from "express";
import { GalleryBusiness } from "../business/GalleryBusiness";
import { photoInputDTO } from "./interfaces/PhotoInputDTO";

export class GalleryControler {
    constructor(
        private galleryBusiness: GalleryBusiness
    ) { }

    public postPhoto = async (req: Request, res: Response) => {
        try {
            const photo = String(req.body.photo)

            const input: photoInputDTO = {
                photo
            }

            await this.galleryBusiness.postPhoto(input)
            res.status(201).send({ message: "Foto publicada na galeria oficial do evento" })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }

    public getPhoto = async (req: Request, res: Response) => {
        try {
            const result = await this.galleryBusiness.getPhoto()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }
}