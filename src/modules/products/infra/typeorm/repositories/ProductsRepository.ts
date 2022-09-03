import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { ICreateProductDTO } from "../../../dtos/ICreateProductDTO";
import { IUpdateProductDTO } from "../../../dtos/IUpdateProductDTO";
import { IProductsRepository } from "../../../repositories/IProductsRepository";
import { Product } from "../entities/Product";

@injectable()
class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({
    name,
    price,
    category_id,
    image_product,
    restaurant_id,
  }: ICreateProductDTO): Promise<Product> {

    const product = this.repository.create({
      name,
      price,
      category_id,
      image_product,
      restaurant_id,
    });
    await this.repository.save(product);
    return product;
  };

  async findByname(name: string): Promise<Product> {

    const productQuery = await this.repository
      .createQueryBuilder("products")
      .where("products.name = :name", { name });

    const product = await productQuery.getOne();

    return product;
  };

  async listByIdRestaurant(id: string): Promise<Product[]> {
    const productListQuery = await this.repository
      .createQueryBuilder("products")
      .where("products.restaurant_id = :id", { id })


    const products = await productListQuery.getMany();
    return products;
  };

  async deleteProductByIdRestaurant(id: string): Promise<void> {
    await this.repository.createQueryBuilder()
      .delete()
      .from("products")
      .where("products.restaurant_id = :id", { id })
      .execute();
  };

  async deleteProductById(id: string): Promise<void> {

    await this.repository.createQueryBuilder()
      .delete()
      .from("products")
      .where("products.id = :id", { id })
      .execute();
  };

  async findById(id: string): Promise<Product> {
    const product = await this.repository.createQueryBuilder("products")
      .where("id = :id", { id })
      .getOne();

    return product;
  };

  async updateDataProductsById({
    id,
    category_id,
    image_product,
    name,
    price,
    promotion,
  }: IUpdateProductDTO): Promise<Product> {

    await this.repository.createQueryBuilder()
      .update("products")
      .set({
        name,
        category_id,
        image_product,
        price,
        promotion,
      })
      .where("id = :id", { id })
      .execute();

    const productUpdated = await this.findById(id);
    return productUpdated;

  };

  async updatePromotion(id: string, promotion: boolean): Promise<void> {
    await this.repository.createQueryBuilder()
      .update("products")
      .set({
        promotion
      })
      .where("id =:id", { id })
      .execute();
  }
};

export { ProductsRepository };