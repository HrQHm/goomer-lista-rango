import { Router } from "express";
import multer from 'multer';
import { CreateProductController } from "../../../../modules/products/useCases/createProduct/CreateProductController";
import { DeleteProductByIdController } from "../../../../modules/products/useCases/deleteProductById/DeleteProductByIdController";
import { ListProductByIdRestaurantController } from "../../../../modules/products/useCases/listProductsByIdRestaurant/ListProductByIdRestaurantController";
import { UpdateProductByIdController } from "../../../../modules/products/useCases/updateProductById/UpdateProductByIdController";
import uploadConfig from './../../../../config/upload';
const upload = multer(uploadConfig.upload('./tmp/products'))

const productRoutes = Router();
const createProductController = new CreateProductController();
const listProductsByIdRestaurantController = new ListProductByIdRestaurantController();
const deleteProductByIdController = new DeleteProductByIdController();
const updateProductByIdController = new UpdateProductByIdController();

productRoutes.post("/", upload.single("image_product"), createProductController.handle);
productRoutes.get("/:id", listProductsByIdRestaurantController.handle);
productRoutes.delete("/:id", deleteProductByIdController.handle);
productRoutes.patch("/:id", upload.single("image_product"), updateProductByIdController.handle);
export { productRoutes };