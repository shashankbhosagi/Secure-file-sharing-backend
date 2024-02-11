import express, { Express, Request, Response } from "express";
const app: Express = express();
import dotenv from "dotenv";
import cors from "cors";

const port = 8000;
import appRoutes from "./routes/appRoutes";

//Middelware
dotenv.config();
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/v1", appRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Yo! Express with TS here");
});

//Starting the server at port 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
