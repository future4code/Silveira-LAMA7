import { CustomError } from "../business/errors/CustomError";
import { User } from "../business/models/User";
import { Database } from "./Database";

export class UserDatabase extends Database {
    private static TABLE_NAME = "Lama7_Users";

    public selectUserEmail = async (email: string): Promise<string> => {
        try {
            const [userEmail] = await Database.connection
            .select("email")
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

            return userEmail;

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };

    public insertUser = async (user: User): Promise<void> => {
        try {
            const { id, name, email, password, role } = user

            await Database.connection
            .insert({
                id,
                name,
                email,
                password,
                role
            })
            .into(UserDatabase.TABLE_NAME);

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };

    public selectUserByEmail = async (email: string): Promise<User> => {
        try {
            const [user] = await Database.connection
            .select()
            .from(UserDatabase.TABLE_NAME)
            .where({ email });

            return User.toUserModel(user);

        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
};