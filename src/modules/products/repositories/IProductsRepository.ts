import { ICreateProductDTO } from "../dtos/ICreateProductDTO"
import { IUpdateProductDTO } from "../dtos/IUpdateProductDTO";
import { Product } from "../infra/typeorm/entities/Product"


interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findByname(name: string): Promise<Product>;
  findById(id: string): Promise<Product>;
  listByIdRestaurant(id: string): Promise<Product[]>;
  deleteProductByIdRestaurant(id: string): Promise<void>;
  deleteProductById(id: string): Promise<void>;
  updateDataProductsById(data: IUpdateProductDTO): Promise<Product>;
  updatePromotion(id: string, promotion: boolean): Promise<void>;
};

export { IProductsRepository };