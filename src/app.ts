import express from "express";
import tachesRouter from "./routes/tachesRouter";

const app = express();
app.use(express.json());
app.use("/taches", tachesRouter);

export default app;
