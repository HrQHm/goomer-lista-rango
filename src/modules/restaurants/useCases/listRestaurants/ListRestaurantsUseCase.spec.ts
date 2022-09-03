import { RestaurantsRepositoryInMemory } from "../../repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { ListRestaurantsUseCase } from "./ListRestaurantsUseCase";

let listRestaurantsUseCase: ListRestaurantsUseCase;
let createRestaurauntUseCase: CreateRestaurantUseCase;
let restaurantsRepository: RestaurantsRepositoryInMemory;

describe("List all restaurants", () => {
  beforeEach(() => {
    restaurantsRepository = new RestaurantsRepositoryInMemory();
    listRestaurantsUseCase = new ListRestaurantsUseCase(restaurantsRepository);
    createRestaurauntUseCase = new CreateRestaurantUseCase(restaurantsRepository);
  });

  it("Should be able to list all restaurants", async () => {
    await createRestaurauntUseCase.execute({
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '14:00',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test"
    });

    await createRestaurauntUseCase.execute({
      name: "Restaurant Test2",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '14:00',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test"
    });

    const restaurants = await listRestaurantsUseCase.execute();
    expect(restaurants).toHaveLength(2);
  });
});