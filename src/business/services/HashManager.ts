import * as bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export class HashManager {
    public static generateHash = async (password: string): Promise<string> => {
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        const hashPassword = bcrypt.hash(password, salt);

        return hashPassword;
    };

    public static compareHash = async (password: string, hashPassword: string): Promise<boolean> => {
        const isPasswordCorrect = await bcrypt.compare(password, hashPassword);

        return isPasswordCorrect;
    };
};