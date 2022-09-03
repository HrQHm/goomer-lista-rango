import { RestaurantsRepositoryInMemory } from "../../repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { ShowRestaurantDataByIdUseCase } from "./ShowRestaurantDataByIdUseCase";

let restaurantRepositoryInMemory: RestaurantsRepositoryInMemory;
let createRestaurantUseCase: CreateRestaurantUseCase;
let showRestaurantDataByIdUseCase: ShowRestaurantDataByIdUseCase;

describe("Show Restaurant Data By Id", () => {
  beforeEach(() => {
    restaurantRepositoryInMemory = new RestaurantsRepositoryInMemory();
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantRepositoryInMemory);
    showRestaurantDataByIdUseCase = new ShowRestaurantDataByIdUseCase(restaurantRepositoryInMemory)
  });

  it("should be able to present the restaurant data by id", async () => {

    const restaurant = await createRestaurantUseCase.execute({
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '18:00',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test"
    });

    const restaurantCreated = await showRestaurantDataByIdUseCase.execute(restaurant.id);
    expect(restaurantCreated.name).toBe("Restaurant Test");
  });
});