import { AppError } from "../../../../shared/errors/AppError";
import { RestaurantsRepositoryInMemory } from "../../repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "./CreateRestaurantUseCase";

let restaurantRepositoryInMemory: RestaurantsRepositoryInMemory;
let createRestaurantUseCase: CreateRestaurantUseCase;

describe("Create a new restaurant", () => {
  beforeEach(() => {
    restaurantRepositoryInMemory = new RestaurantsRepositoryInMemory();
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantRepositoryInMemory);
  });

  it("Should be able to create a new restaurant", async () => {
    const restaurant = await createRestaurantUseCase.execute({
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '13:50',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test"
    });

    expect(restaurant).toHaveProperty("id");
  });

  it("Should not be able to create a restaurant with same name", async () => {
    const restaurant = {
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '13:50',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      user_id: "User test",
      address: "Address test"
    };

    await createRestaurantUseCase.execute({
      name: restaurant.name,
      image_restaurant: restaurant.image_restaurant,
      weekDayOpen: restaurant.weekDayOpen,
      weekDayClose: restaurant.weekDayClose,
      opening_time_week: restaurant.opening_time_week,
      closing_time_week: restaurant.closing_time_week,
      weekendOpen: restaurant.weekendOpen,
      weekendClose: restaurant.weekendClose,
      opening_time_weekend: restaurant.opening_time_weekend,
      closing_time_weekend: restaurant.closing_time_weekend,
      address: restaurant.address
    });

    await expect(createRestaurantUseCase.execute({
      name: restaurant.name,
      image_restaurant: restaurant.image_restaurant,
      weekDayOpen: restaurant.weekDayOpen,
      weekDayClose: restaurant.weekDayClose,
      opening_time_week: restaurant.opening_time_week,
      closing_time_week: restaurant.closing_time_week,
      weekendOpen: restaurant.weekendOpen,
      weekendClose: restaurant.weekendClose,
      opening_time_weekend: restaurant.opening_time_weekend,
      closing_time_weekend: restaurant.closing_time_weekend,
      address: restaurant.address
    })).rejects.toEqual(new AppError("Restaurant already exists"));
  });

  it("should not be possible to create a restaurant if the opening and closing times are not at least 15 minutes apart", async () => {
    const restaurant = {
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '12:13',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test"
    };

    await expect(createRestaurantUseCase.execute({
      name: restaurant.name,
      image_restaurant: restaurant.image_restaurant,
      weekDayOpen: restaurant.weekDayOpen,
      weekDayClose: restaurant.weekDayClose,
      opening_time_week: restaurant.opening_time_week,
      closing_time_week: restaurant.closing_time_week,
      weekendOpen: restaurant.weekendOpen,
      weekendClose: restaurant.weekendClose,
      opening_time_weekend: restaurant.opening_time_weekend,
      closing_time_weekend: restaurant.closing_time_weekend,
      address: restaurant.address
    })).rejects.toEqual(new AppError("The Minimum Time between opening and closing hours must be 15 minutes"));
  });
})