import express from "express";
import multer from "multer";
import MyResturantController from "../controllers/MyResturantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, //5md
  },
});

router.get("/", jwtCheck, jwtParse, MyResturantController.getMyResturant);

router.post(
  "/",
  upload.single("imageFile"),
  // validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyResturantController.createMyResturant
);
router.put(
  "/",
  upload.single("imageFile"),
  // validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyResturantController.updateMyResturant
);

export default router;
