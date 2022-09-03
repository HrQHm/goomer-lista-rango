import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { productRoutes } from "./products.routes";
import { promotionsRoutes } from "./promotions.routes";
import { restaurantRoutes } from "./restaurants.routes";

const router = Router();
router.use('/categories', categoriesRoutes);
router.use('/products', productRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/promotions', promotionsRoutes)

export { router };