import { AppError } from "../../../../shared/errors/AppError";
import { ProductsRepositoryInMemory } from "../../../products/repositories/in-memory/ProductsRepositoryInMemory";
import { RestaurantsRepositoryInMemory } from "../../repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { DeleteRestaurantByIdUseCase } from "./DeleteRestaurantByIdUseCase";

let restaurantRepository: RestaurantsRepositoryInMemory;
let deleteRestaurantByIdUseCase: DeleteRestaurantByIdUseCase;
let createRestaurantUseCase: CreateRestaurantUseCase;
let productsRepository: ProductsRepositoryInMemory;

describe("Delete restaurant", () => {
  beforeEach(() => {
    restaurantRepository = new RestaurantsRepositoryInMemory();
    productsRepository = new ProductsRepositoryInMemory();
    deleteRestaurantByIdUseCase = new DeleteRestaurantByIdUseCase(restaurantRepository, productsRepository);
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantRepository)
  });

  it("Should not be able to delete a restaurant if doesn't exist", async () => {
    await expect(deleteRestaurantByIdUseCase.execute("1")).rejects.toEqual(new AppError("Restaurant does not exist."));
  });

  it("Should be able to delete a restaurant", async () => {
    const restaurant = await createRestaurantUseCase.execute({
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

    await deleteRestaurantByIdUseCase.execute(restaurant.id);

    const listRestaurant = await restaurantRepository.list();
    expect(listRestaurant).toHaveLength(0);
  });
});
