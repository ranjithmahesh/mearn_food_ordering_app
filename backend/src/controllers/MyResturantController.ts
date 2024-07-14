import cloudinary from "cloudinary";
import { Request, Response } from "express";
import mongoose from "mongoose";
import Resturant from "../models/resturant";

const createMyResturant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Resturant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(409).send({ message: "User restaurant already exist" });
    }


    const imageUrl= await uploadImage( req.file as Express.Multer.File)



    const newResturant = new Resturant(req.body);
    newResturant.imageUrl = imageUrl
    newResturant.user = new mongoose.Types.ObjectId(req.userId);
    newResturant.lastUpdated = new Date();

    await newResturant.save();
    res.status(201).json({
      message: "new resturant  created",
      newResturant: newResturant.toObject(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};
const updateMyResturant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Resturant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).send({ message: "restaurant not found" });
    }

    restaurant.resturantName= req.body.resturantName
    restaurant.city= req.body.city
    restaurant.country= req.body.country
    restaurant.deliveryPrice= req.body.deliveryPrice
    restaurant.estimatedDeliveryTime= req.body.estimatedDeliveryTime
    restaurant.cuisines= req.body.cuisines
    restaurant.menuItems= req.body.menuItems
    restaurant.lastUpdated= new Date()


    if(req.file){

      const imageUrl= await uploadImage( req.file as Express.Multer.File)
      restaurant.imageUrl= imageUrl
    }




   
    await restaurant.save();
    res.status(200).json({
      message: "Updated resturant",
      newResturant: restaurant.toObject(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};

const getMyResturant = async (req: Request, res: Response) => {
  try {
    const resturant = await Resturant.findOne({ user: req.userId });
    if (!resturant) {
      return res.status(404).json({ message: "resturant not found" });
    }
    res.status(200).json(resturant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};



const uploadImage=async(file: Express.Multer.File)=>{

  const image = file 
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const UploadResponse = await cloudinary.v2.uploader.upload(dataURI);
return UploadResponse.url
}
export default { createMyResturant, getMyResturant ,updateMyResturant};
