import { Router } from "express";
import multer from "multer";
import { AlterDataRestaurantController } from "../../../../modules/restaurants/useCases/alterDataRestaurant/AlterDataRestaurantController";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";
import { DeleteRestaurantByIdController } from "../../../../modules/restaurants/useCases/deleteRestaurantById/DeleteRestaurantByIdController";
import { ListRestaurantsController } from "../../../../modules/restaurants/useCases/listRestaurants/ListRestaurantsController";
import { ShowRestaurantDataByIdController } from "../../../../modules/restaurants/useCases/showRestaurantDataById/ShowRestaurantDataByIdController";
import uploadConfig from './../../../../config/upload';


const upload = multer(uploadConfig.upload('./tmp/restaurants'))

const restaurantRoutes = Router();
const createRestaurantController = new CreateRestaurantController();
const listRestaurantsController = new ListRestaurantsController();
const showRestaurantDataByIdController = new ShowRestaurantDataByIdController();
const deleteRestaurantByIdController = new DeleteRestaurantByIdController();
const alterDataRestaurantController = new AlterDataRestaurantController();

restaurantRoutes.post("/", upload.single('image_restaurant'), createRestaurantController.handle);
restaurantRoutes.get("/", listRestaurantsController.handle);
restaurantRoutes.get("/:id", showRestaurantDataByIdController.handle);
restaurantRoutes.delete("/:id", deleteRestaurantByIdController.handle);
restaurantRoutes.patch("/:id", upload.single('image_restaurant'), alterDataRestaurantController.handle);
export { restaurantRoutes };