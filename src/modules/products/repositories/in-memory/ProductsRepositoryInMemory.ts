import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IUpdateProductDTO } from "../../dtos/IUpdateProductDTO";
import { Product } from "../../infra/typeorm/entities/Product";
import { IProductsRepository } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {

  products: Product[] = [];

  async create({
    name,
    price,
    category_id,
    image_product,
    restaurant_id,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();
    Object.assign(product, ({
      name,
      price,
      category_id,
      image_product,
      restaurant_id,
    }));

    this.products.push(product);
    return product;
  };

  async findByname(name: string): Promise<Product> {
    const product = this.products.find(product => product.name === name);
    return product;
  };

  async listByIdRestaurant(id: string): Promise<Product[]> {
    const products = this.products.filter(product => product.restaurant_id === id);
    return products;
  };

  async deleteProductByIdRestaurant(id: string): Promise<void> {
    const product = this.products.find(product => product.restaurant_id === id);
    this.products.splice(this.products.indexOf(product));
  };

  async deleteProductById(id: string): Promise<void> {
    const product = this.products.find(product => product.id === id);
    this.products.splice(this.products.indexOf(product));
  };

  async updateDataProductsById({
    id,
    name,
    category_id,
    image_product,
    price,
    promotion,
  }: IUpdateProductDTO): Promise<Product> {
    const findIndex = this.products.findIndex((product) => product.id === id);
    this.products[findIndex].name = name;
    this.products[findIndex].category_id = category_id;
    this.products[findIndex].image_product = image_product;
    this.products[findIndex].price = price;
    this.products[findIndex].promotion = promotion;

    return this.products[findIndex];
  };

  async findById(id: string): Promise<Product> {
    return this.products.find((product) => product.id === id);
  };

  async updatePromotion(id: string, promotion: boolean): Promise<void> {
    const findIndex = this.products.findIndex((product) => product.id === id);
    this.products[findIndex].promotion = promotion;
  }
};

export { ProductsRepositoryInMemory };