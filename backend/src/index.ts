import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/my/user", myUserRoute);
app.get("/health", async (req: Request, res: Response) => {
  res.status(200).send({ message: "Health Ok!" });
});

app.listen(7000, () => {
  console.log(`server running on port 7000`);
});
