import { app } from "./app";
import { bandRouter } from "./controller/routes/bandRouter";
import { galleryRouter } from "./controller/routes/galleryRouter";
import { showRouter } from "./controller/routes/showRouter";
import { userRouter } from "./controller/routes/userRouter";

app.use("/band", bandRouter)

app.use("/user", userRouter);

app.use("/show", showRouter)

app.use("/gallery", galleryRouter)

