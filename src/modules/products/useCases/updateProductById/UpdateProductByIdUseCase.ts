import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { IUpdateProductDTO } from "../../dtos/IUpdateProductDTO";
import { Product } from "../../infra/typeorm/entities/Product";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class UpdateProductByUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }

  async execute({
    id,
    category_id,
    name,
    image_product,
    price,
    promotion,
  }: IUpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError("Product does not exist");
    }

    if (!category_id) {
      category_id = product.category_id;
    };

    if (!name) {
      name = product.name;
    };

    if (!image_product) {
      image_product = product.image_product;
    };

    if (!price) {
      price = product.price;
    };

    const productUpdated = await this.productsRepository.updateDataProductsById({
      id,
      name,
      category_id,
      image_product,
      price,
      promotion,
    });

    return productUpdated;
  }
};

export { UpdateProductByUseCase };