import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class DeleteRestaurantByIdUseCase {
  constructor(
    @inject("RestaurantsRepository")
    private restaurantRepository: IRestaurantsRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute(id: string): Promise<void> {
    const restaurantExist = await this.restaurantRepository.findById(id);

    if (!restaurantExist) {
      throw new AppError("Restaurant does not exist.");
    };

    await this.productsRepository.deleteProductByIdRestaurant(id);
    await this.restaurantRepository.deleteById(id);
  }
};

export { DeleteRestaurantByIdUseCase };