import express from "express";
import tachesRouter from "./routes/tachesRouter";

const app = express();
app.use(express.json());

app.get("/api/", (req, res) => {
    res.send("<h1>Mailer ECV - API</h1>");
});

app.use("/api/taches", tachesRouter);

export default app;
