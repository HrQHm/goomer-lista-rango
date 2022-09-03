import { ICreateRestaurantDTO } from "../../dtos/ICreateRestaurantDTO";
import { IUpdateRestaurantDTO } from "../../dtos/IUpdateRestaurantDTO";
import { Restaurant } from "../../infra/typeorm/entities/Restaurant";
import { IRestaurantsRepository } from "../IRestaurantsRepository";

class RestaurantsRepositoryInMemory implements IRestaurantsRepository {


  restaurants: Restaurant[] = [];

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
    const restaurant = new Restaurant();
    Object.assign(restaurant, ({
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
    }));

    this.restaurants.push(restaurant);
    return restaurant;
  };

  async findByName(name: string): Promise<Restaurant> {
    const restaurant = this.restaurants.find(restaurant => restaurant.name === name);
    return restaurant;
  };

  async findById(id: string): Promise<Restaurant> {
    const restaurant = this.restaurants.find(restaurant => restaurant.id === id);
    return restaurant;
  };

  async list(): Promise<Restaurant[]> {
    return this.restaurants;
  };

  async deleteById(id: string): Promise<void> {
    const restaurant = this.restaurants.find(restaurant => restaurant.id === id);
    this.restaurants.splice(this.restaurants.indexOf(restaurant));
  };

  async updateData({
    id,
    address,
    image_restaurant,
    name,
    weekDayOpen,
    weekDayClose,
    opening_time_week,
    closing_time_week,
    weekendOpen,
    weekendClose,
    opening_time_weekend,
    closing_time_weekend
  }: IUpdateRestaurantDTO): Promise<Restaurant> {
    const findIndex = this.restaurants.findIndex((restaurant) => restaurant.id === id)
    this.restaurants[findIndex].address = address;
    this.restaurants[findIndex].image_restaurant = image_restaurant;
    this.restaurants[findIndex].name = name;
    this.restaurants[findIndex].weekDayOpen = weekDayOpen;
    this.restaurants[findIndex].weekDayClose = weekDayClose;
    this.restaurants[findIndex].opening_time_week = opening_time_week;
    this.restaurants[findIndex].closing_time_week = closing_time_week;
    this.restaurants[findIndex].weekendOpen = weekendOpen;
    this.restaurants[findIndex].weekendClose = weekendClose;
    this.restaurants[findIndex].opening_time_weekend = opening_time_weekend;
    this.restaurants[findIndex].closing_time_weekend = closing_time_weekend;

    return this.restaurants[findIndex];
  }
};

export { RestaurantsRepositoryInMemory };