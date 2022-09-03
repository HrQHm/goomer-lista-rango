import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { IResponseRestaurantDTO } from "../../dtos/IResponseRestaurantDTO";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class ListRestaurantsUseCase {
  constructor(
    @inject("RestaurantsRepository")
    private restaurantsRepository: IRestaurantsRepository
  ) { }

  async execute(): Promise<IResponseRestaurantDTO[]> {
    const restaurants = await this.restaurantsRepository.list();
    const restaurantsList = restaurants.map((restaurant) => {
      const restaurantUpdated = {
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

      return restaurantUpdated;
    });
    return restaurantsList;
  }
};

export { ListRestaurantsUseCase };