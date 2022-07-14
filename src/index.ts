import { app } from "./app";
import { bandRouter } from "./controller/routes/bandRouter";
import { userRouter } from "./controller/routes/userRouter";

app.use("/band",bandRouter)

app.use("/user", userRouter);

