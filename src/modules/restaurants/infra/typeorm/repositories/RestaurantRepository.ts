import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { ICreateRestaurantDTO } from "../../../dtos/ICreateRestaurantDTO";
import { IUpdateRestaurantDTO } from "../../../dtos/IUpdateRestaurantDTO";
import { IRestaurantsRepository } from "../../../repositories/IRestaurantsRepository";
import { Restaurant } from "../entities/Restaurant";

@injectable()
class RestaurantsRepository implements IRestaurantsRepository {
  private repository: Repository<Restaurant>;
  constructor() {
    this.repository = getRepository(Restaurant);
  }

  async create({
    name,
    image_restaurant,
    weekDayOpen,
    weekDayClose,
    opening_time_week,
    closing_time_week,
    weekendOpen,
    weekendClose,
    opening_time_weekend,
    closing_time_weekend,
    address
  }: ICreateRestaurantDTO): Promise<Restaurant> {

    const restaurant = await this.repository.create({
      name,
      image_restaurant,
      address,
      weekDayOpen,
      weekDayClose,
      opening_time_week,
      closing_time_week,
      weekendOpen,
      weekendClose,
      opening_time_weekend,
      closing_time_weekend,
    });

    await this.repository.save(restaurant);
    return restaurant;

  };

  async findByName(name: string): Promise<Restaurant> {
    const restaurantQuery = await this.repository.createQueryBuilder("restaurants")
      .where("restaurants.name = :name", { name });

    const restaurant = await restaurantQuery.getOne();
    return restaurant;
  };

  async findById(id: string): Promise<Restaurant> {

    const restaurantQuery = await this.repository.createQueryBuilder("restaurants")
      .where("restaurants.id = :id", { id });

    const restaurant = await restaurantQuery.getOne();
    return restaurant;
  };

  async list(): Promise<Restaurant[]> {
    const restaurantsListQuery = await this.repository
      .createQueryBuilder("restaurants");

    const restaurants = await restaurantsListQuery.getMany();
    return restaurants;
  };

  async deleteById(id: string): Promise<void> {

    await this.repository.createQueryBuilder()
      .delete()
      .from("restaurants")
      .where("id = :id", { id })
      .execute();
  };

  async updateData({
    id,
    name,
    address,
    image_restaurant,
    weekDayOpen,
    weekDayClose,
    opening_time_week,
    closing_time_week,
    weekendOpen,
    weekendClose,
    opening_time_weekend,
    closing_time_weekend
  }: IUpdateRestaurantDTO): Promise<Restaurant> {
    await this.repository.createQueryBuilder()
      .update("restaurants")
      .set({
        name,
        address,
        image_restaurant,
        weekDayOpen,
        weekDayClose,
        opening_time_week,
        closing_time_week,
        weekendOpen,
        weekendClose,
        opening_time_weekend,
        closing_time_weekend
      })
      .where("id = :id", { id })
      .execute()

    const updatedRestaurant = await this.findById(id);
    return updatedRestaurant;
  };
};

export { RestaurantsRepository }