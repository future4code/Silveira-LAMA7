import { bandSignupDTO } from "../controller/interfaces/BandSignupDTO";
import { Database } from "./Database";

export class BandDataBase extends Database {
    public insertBand = async (input: bandSignupDTO, id: string) => {
        try {
            
            const { name, musicalGenre, responsible } = input
            Database.connection()
                .insert({
                    id,
                    name,
                    musicalGenre,
                    responsible
                })
                .into("Lama7_Bands")

        } catch (error: any) {
            throw new Error(error.sqlMessage);
        }
    }
}