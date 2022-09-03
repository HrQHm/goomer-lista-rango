import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../../restaurants/repositories/IRestaurantsRepository";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { Product } from "../../infra/typeorm/entities/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("RestaurantsRepository")
    private restaurantsRepository: IRestaurantsRepository
  ) { }

  async execute({
    name,
    price,
    image_product,
    category_id,
    restaurant_id,
    promotion
  }: ICreateProductDTO): Promise<Product> {

    const productAlreadyExist = await this.productsRepository.findByname(name);

    if (productAlreadyExist) {
      throw new AppError("Products already exist", 422);
    }

    if (restaurant_id) {
      const restaurantExist = await this.restaurantsRepository.findById(restaurant_id);

      if (!restaurantExist) {
        throw new AppError("Restaurant does not exists");
      }
    }

    const productCreated = await this.productsRepository.create({
      name,
      price,
      image_product,
      category_id,
      restaurant_id,
      promotion,
    });

    return productCreated;
  }
};

export { CreateProductUseCase };