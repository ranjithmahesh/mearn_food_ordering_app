import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;

    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);

    await newUser.save();
    res
      .status(201)
      .json({ message: "new user created", newUser: newUser.toObject() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error  creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(400).send({ message: "user not found " });

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();
    res
      .status(200)
      .json({ message: " user Details Added", user: user.toObject() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error  creating user" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const CurrentUser = await User.findById(req.userId);

    if (!CurrentUser) {
      return res.status(404).send({ message: "user not found " });
    }

    res.status(200).json(CurrentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Somthing went wrong" });
  }
};
export default { createCurrentUser, updateCurrentUser, getCurrentUser };
