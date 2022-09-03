import { Router } from "express";
import { CreatePromotionController } from "../../../../modules/promotions/useCases/createPromotion/CreatePromotionController";
import { DeletePromotionByIdController } from "../../../../modules/promotions/useCases/deletePromotionById/DeletePromotionByIdController";
import { ListPromotionByProductController } from "../../../../modules/promotions/useCases/listPromotionsByProduct/ListPromotionsByProductController";
import { UpdatePromotionByIdController } from "../../../../modules/promotions/useCases/updatePromotionById/UpdatePromotionByIdController";

const promotionsRoutes = Router();
const createPromotionController = new CreatePromotionController();
const listPromotionsByProductController = new ListPromotionByProductController();
const updatePromotionByIdController = new UpdatePromotionByIdController();
const deletePromotionByIdController = new DeletePromotionByIdController();

promotionsRoutes.post("/:id", createPromotionController.handle);
promotionsRoutes.get("/:id", listPromotionsByProductController.handle);
promotionsRoutes.patch("/:id", updatePromotionByIdController.handle);
promotionsRoutes.delete("/:id", deletePromotionByIdController.handle);
export { promotionsRoutes };