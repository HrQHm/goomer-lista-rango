import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { IResponseRestaurantDTO } from "../../dtos/IResponseRestaurantDTO";
import { IUpdateRestaurantDTO } from "../../dtos/IUpdateRestaurantDTO";
import { Restaurant } from "../../infra/typeorm/entities/Restaurant";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class AlterDataRestaurantUseCase {
  constructor(
    @inject("RestaurantsRepository")
    private restaurantsRepository: IRestaurantsRepository
  ) { }

  async execute({
    id,
    name,
    weekDayOpen,
    weekDayClose,
    opening_time_week,
    closing_time_week,
    weekendOpen,
    weekendClose,
    opening_time_weekend,
    closing_time_weekend,
    image_restaurant,
    address
  }: IUpdateRestaurantDTO): Promise<IResponseRestaurantDTO> {
    const restaurant = await this.restaurantsRepository.findById(id);
    const openingTimeWeek = dayjs(`2022-01-01 ${opening_time_week}`);
    const closingTimeWeek = dayjs(`2022-01-01 ${closing_time_week}`);
    const minsWeek = closingTimeWeek.diff(openingTimeWeek, "minutes", true);
    const openingTimeWeekend = dayjs(`2022-01-01 ${opening_time_weekend}`);
    const closingTimeWeekend = dayjs(`2022-01-01 ${closing_time_weekend}`);
    const minsWeekend = closingTimeWeekend.diff(openingTimeWeekend, "minutes", true);

    if (!restaurant) {
      throw new AppError("Restaurant does not exist.");
    };

    if ((minsWeek < 15) || (minsWeekend < 15)) {
      throw new AppError("The Minimum Time between opening and closing hours must be 15 minutes");
    };

    if (!name) {
      name = restaurant.name;
    };

    if (!image_restaurant) {
      image_restaurant = restaurant.image_restaurant
    };

    if (!address) {
      address = restaurant.address
    };

    if (!weekDayOpen) {
      weekDayOpen = restaurant.weekDayOpen
    };

    if (!weekDayClose) {
      weekDayClose = restaurant.weekDayClose
    };

    if (!opening_time_week) {
      opening_time_week = restaurant.opening_time_week
    };

    if (!closing_time_week) {
      closing_time_week = restaurant.closing_time_week
    };

    if (!weekendOpen) {
      weekendOpen = restaurant.weekendOpen
    };

    if (!weekendClose) {
      weekendClose = restaurant.weekendClose
    };

    if (!opening_time_weekend) {
      opening_time_weekend = restaurant.opening_time_weekend
    };

    if (!closing_time_weekend) {
      closing_time_weekend = restaurant.closing_time_weekend
    };

    const updatedRestaurant = await this.restaurantsRepository.updateData({
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
    });

    const restaurantData = {
      id: updatedRestaurant.id,
      name: updatedRestaurant.name,
      image_restaurant: updatedRestaurant.image_restaurant,
      weekDayOpen: weekdays[updatedRestaurant.weekDayOpen],
      weekDayClose: weekdays[updatedRestaurant.weekDayClose],
      opening_time_week: updatedRestaurant.opening_time_week,
      closing_time_week: updatedRestaurant.closing_time_week,
      weekendOpen: weekdays[updatedRestaurant.weekendOpen],
      weekendClose: weekdays[updatedRestaurant.weekendClose],
      opening_time_weekend: updatedRestaurant.opening_time_weekend,
      closing_time_weekend: updatedRestaurant.closing_time_weekend,
      address: updatedRestaurant.address
    };
    return restaurantData;
  };
};

export { AlterDataRestaurantUseCase };