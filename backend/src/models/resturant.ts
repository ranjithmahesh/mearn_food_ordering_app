import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
});

const resturantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  resturantName: { type: String, require: true },
  city: { type: String, require: true },
  country: { type: String, require: true },
  deliveryPrice: { type: Number, require: true },
  estimatedDeliveryTime: { type: Number, require: true },
  cuisines: [{ type: String, require: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, require: true },
  lastUpdated: { type: Date, require: true },
});

const Resturant = mongoose.model("Resturant", resturantSchema);
export default Resturant;
