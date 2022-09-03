import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { IResponseRestaurantDTO } from "../../dtos/IResponseRestaurantDTO";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class ShowRestaurantDataByIdUseCase {
  constructor(
    @inject("RestaurantsRepository")
    private restaurantsRepository: IRestaurantsRepository
  ) { }

  async execute(id: string): Promise<IResponseRestaurantDTO> {
    const restaurant = await this.restaurantsRepository.findById(id);
    const restaurantData = {
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
    };
    return restaurantData;
  }
};

export { ShowRestaurantDataByIdUseCase };