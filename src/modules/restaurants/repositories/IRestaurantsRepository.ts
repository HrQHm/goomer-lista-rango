import { ICreateRestaurantDTO } from "../dtos/ICreateRestaurantDTO";
import { IUpdateRestaurantDTO } from "../dtos/IUpdateRestaurantDTO";
import { Restaurant } from "../infra/typeorm/entities/Restaurant";

interface IRestaurantsRepository {
  create(data: ICreateRestaurantDTO): Promise<Restaurant>;
  findByName(name: string): Promise<Restaurant>;
  findById(id: string): Promise<Restaurant>;
  list(): Promise<Restaurant[]>;
  deleteById(id: string): Promise<void>;
  updateData(data: IUpdateRestaurantDTO): Promise<Restaurant>;
};

export { IRestaurantsRepository };