import { AppError } from "../../../../shared/errors/AppError";
import { RestaurantsRepositoryInMemory } from "../../repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { AlterDataRestaurantUseCase } from "./AlterDataRestaurantUseCase";

let restaurantsRepositoryInMemory: RestaurantsRepositoryInMemory;
let createRestaurantUseCase: CreateRestaurantUseCase;
let alterDataRestaurantUseCase: AlterDataRestaurantUseCase;

describe("Update data for a restaurant", () => {
  beforeEach(() => {
    restaurantsRepositoryInMemory = new RestaurantsRepositoryInMemory();
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantsRepositoryInMemory);
    alterDataRestaurantUseCase = new AlterDataRestaurantUseCase(restaurantsRepositoryInMemory)
  });

  it("should be possible to change the details of a restaurant", async () => {
    const restaurant = await createRestaurantUseCase.execute({
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '12:22',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '14:50',
      address: "Address test"
    });

    const updateRestaurant = await alterDataRestaurantUseCase.execute({
      id: restaurant.id,
      name: "Restaurant Test2",
      image_restaurant: "Image test2",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '15:55',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '16:50',
      address: "Address test2"
    });

    expect(updateRestaurant.name).toBe("Restaurant Test2");
  });

  it("should not be possible to change the restaurant data if it does not exist", async () => {
    await expect(alterDataRestaurantUseCase.execute({
      id: "id test",
      name: "Restaurant Test2",
      image_restaurant: "Image test2",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '13:50',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test2"
    })).rejects.toEqual(new AppError("Restaurant does not exist."));
  });

  it("should not be possible to update a restaurant if the opening and closing times are not at least 15 minutes apart", async () => {
    const restaurant = await createRestaurantUseCase.execute({
      name: "Restaurant Test333",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '12:22',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '14:50',
      address: "Address test"
    });


    await expect(alterDataRestaurantUseCase.execute({
      id: restaurant.id,
      name: restaurant.name,
      image_restaurant: restaurant.image_restaurant,
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: "12:00",
      closing_time_week: "12:10",
      weekendOpen: 4,
      weekendClose: 5,
      opening_time_weekend: restaurant.opening_time_weekend,
      closing_time_weekend: restaurant.closing_time_weekend,
      address: restaurant.address
    })).rejects.toEqual(new AppError("The Minimum Time between opening and closing hours must be 15 minutes"));
  });
});