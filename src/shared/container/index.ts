import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/products/infra/typeorm/repositories/CategoriesRepository';
import { ProductsRepository } from '../../modules/products/infra/typeorm/repositories/ProductsRepository';
import { ICategoriesRepository } from '../../modules/products/repositories/ICategoriesRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';
import { PromotionsRepository } from '../../modules/promotions/infra/repositories/PromotionsRepository';
import { IPromotionsRepository } from '../../modules/promotions/repositories/IPromotionsRepository';
import { RestaurantsRepository } from '../../modules/restaurants/infra/typeorm/repositories/RestaurantRepository';
import { IRestaurantsRepository } from '../../modules/restaurants/repositories/IRestaurantsRepository';

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<IRestaurantsRepository>(
  "RestaurantsRepository",
  RestaurantsRepository
);

container.registerSingleton<IPromotionsRepository>(
  "PromotionsRepository",
  PromotionsRepository
);

