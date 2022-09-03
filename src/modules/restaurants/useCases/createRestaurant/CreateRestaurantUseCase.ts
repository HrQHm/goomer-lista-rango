import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateRestaurantDTO } from "../../dtos/ICreateRestaurantDTO";
import { IResponseRestaurantDTO } from "../../dtos/IResponseRestaurantDTO";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class CreateRestaurantUseCase {
  constructor(
    @inject("RestaurantsRepository")
    private restaurantsRepository: IRestaurantsRepository
  ) { }

  async execute({
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
  }: ICreateRestaurantDTO): Promise<IResponseRestaurantDTO> {

    const restaurantAlreadyExists = await this.restaurantsRepository.findByName(name);
    const openingTimeWeek = dayjs(`2022-01-01 ${opening_time_week}`);
    const closingTimeWeek = dayjs(`2022-01-01 ${closing_time_week}`);
    const minsWeek = closingTimeWeek.diff(openingTimeWeek, "minutes", true);
    const openingTimeWeekend = dayjs(`2022-01-01 ${opening_time_weekend}`);
    const closingTimeWeekend = dayjs(`2022-01-01 ${closing_time_weekend}`);
    const minsWeekend = closingTimeWeekend.diff(openingTimeWeekend, "minutes", true);

    if ((minsWeek < 15) || (minsWeekend < 15)) {
      throw new AppError("The Minimum Time between opening and closing hours must be 15 minutes");
    };

    if (restaurantAlreadyExists) {
      throw new AppError("Restaurant already exists");
    };

    const restaurant = await this.restaurantsRepository.create({
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
    });

    const restaurantReturn = {
      id: restaurant.id,
      name: restaurant.name,
      image_restaurant: restaurant.image_restaurant,
      weekDayOpen: weekdays[restaurant.weekDayOpen],
      weekDayClose: weekdays[restaurant.weekDayClose],
      opening_time_week: restaurant.opening_time_week,
      closing_time_week: restaurant.closing_time_week,
      weekendOpen: weekdays[restaurant.weekendOpen],
      weekendClose: weekdays[restaurant.weekendClose],
      opening_time_weekend: restaurant.opening_time_weekend,
      closing_time_weekend: restaurant.closing_time_weekend,
      address: restaurant.address
    }

    return restaurantReturn;
  };
}

export { CreateRestaurantUseCase };