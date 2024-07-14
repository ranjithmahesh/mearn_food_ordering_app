import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import myUserRoute from "./routes/MyUserRoutes";
import myUserResturant from "./routes/MyRestaurantRoute";

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));
const app = express();
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cors());
app.use("/api/my/user", myUserRoute);
app.use("/api/my/resturant", myUserResturant);
app.get("/health", async (req: Request, res: Response) => {
  res.status(200).send({ message: "Health Ok!" });
});

app.listen(7000, () => {
  console.log(`server running on port 7000`);
});
