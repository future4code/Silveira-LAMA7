import { bandSignupDTO } from "../controller/interfaces/BandSignupDTO";
import { Database } from "./Database";

export class BandDataBase extends Database {
    public insertBand = async (input: bandSignupDTO, id: string) => {
        try {
            
            const { name, musicalGenre, responsible } = input
            await Database.connection()
                .insert({
                    id,
                    name,
                    music_genre: musicalGenre,
                    responsible
                })
                .into("Lama7_Bands")

        } catch (error: any) {
            throw new Error(error.sqlMessage);
        }
    }

    public getBandByName = async (bandName: string) => {
        try {
   
            const band = await Database.connection()
                .select("*")
                .from("Lama7_Bands")
                .where({name: bandName})

            return band

        } catch (error: any) {
            throw new Error(error.sqlMessage);
        }
    }

}