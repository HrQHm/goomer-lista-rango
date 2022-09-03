import { AppError } from "../../../../shared/errors/AppError";
import { RestaurantsRepositoryInMemory } from "../../../restaurants/repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../../../restaurants/useCases/createRestaurant/CreateRestaurantUseCase";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "./CreateProductUseCase";

let createProductUseCase: CreateProductUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let restaurantsRepositoryInMemory: RestaurantsRepositoryInMemory;
let createRestaurantUseCase: CreateRestaurantUseCase;

describe("Create a new product", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    restaurantsRepositoryInMemory = new RestaurantsRepositoryInMemory();
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory, restaurantsRepositoryInMemory);
  });

  it("Should be able to create a new product", async () => {
    const restaurant = await createRestaurantUseCase.execute({
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '12:18',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test",
    });

    const product = await createProductUseCase.execute({
      name: "Product test",
      image_product: "Image test",
      price: 2.50,
      category_id: "Category Test",
      restaurant_id: restaurant.id,
      promotion: true,
    })

    expect(product).toHaveProperty("id");
  });

  it("Should not be able to create a produtc whit name exist", async () => {
    const restaurant = await createRestaurantUseCase.execute({
      name: "Restaurant Test",
      image_restaurant: "Image test",
      weekDayOpen: 1,
      weekDayClose: 6,
      opening_time_week: '12:00',
      closing_time_week: '12:18',
      weekendOpen: 7,
      weekendClose: 8,
      opening_time_weekend: '12:00',
      closing_time_weekend: '13:50',
      address: "Address test",
    });

    const product = {
      name: "Product test",
      image_product: "Image test",
      price: 2.50,
      category_id: "Category Test",
      restaurant_id: restaurant.id
    };

    await createProductUseCase.execute({
      name: product.name,
      image_product: product.image_product,
      price: product.price,
      category_id: product.category_id,
      restaurant_id: restaurant.id,
      promotion: true,
    });

    await expect(createProductUseCase.execute({
      name: product.name,
      image_product: product.image_product,
      price: product.price,
      category_id: product.category_id,
      restaurant_id: restaurant.id,
      promotion: true,
    })).rejects.toEqual(new AppError("Products already exist", 422));
  });

  it("Should not be able to a create a product if restaurant not exists", async () => {

    await expect(createProductUseCase.execute({
      name: "Product test",
      image_product: "Image test",
      price: 2.50,
      category_id: "Category Test",
      restaurant_id: "invalid_id",
      promotion: true,
    })).rejects.toEqual(new AppError("Restaurant does not exists"));
  });
});