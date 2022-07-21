import express from "express"
import { GalleryBusiness } from "../../business/GalleryBusiness";
import { GalleryDatabase } from "../../data/GalleryDatabase";
import { GalleryControler } from "../GalleryController";

export const galleryRouter = express.Router();

const galleryBusiness = new GalleryBusiness(
    new GalleryDatabase
);

const galleryControler = new GalleryControler(galleryBusiness)

galleryRouter.post("/post", galleryControler.postPhoto)
galleryRouter.get("/all", galleryControler.getPhoto)