import { inject, injectable } from "tsyringe";
import { Product } from "../../infra/typeorm/entities/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class ListProductsByIdRestaurantUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute(id: string): Promise<Product[]> {
    const products = await this.productsRepository.listByIdRestaurant(id);

    return products;
  }
};

export { ListProductsByIdRestaurantUseCase }