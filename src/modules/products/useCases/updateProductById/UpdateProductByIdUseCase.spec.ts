import { AppError } from "../../../../shared/errors/AppError";
import { RestaurantsRepositoryInMemory } from "../../../restaurants/repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../../../restaurants/useCases/createRestaurant/CreateRestaurantUseCase";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { UpdateProductByUseCase } from "./UpdateProductByIdUseCase";

let productsRepositoryInMemory: ProductsRepositoryInMemory;
let updateProductByIdUseCase: UpdateProductByUseCase;
let createProductUseCase: CreateProductUseCase;
let createRestaurantUseCase: CreateRestaurantUseCase;
let restaurantsRepositoryInMemory: RestaurantsRepositoryInMemory;

describe("Update Product", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    restaurantsRepositoryInMemory = new RestaurantsRepositoryInMemory();
    updateProductByIdUseCase = new UpdateProductByUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory, restaurantsRepositoryInMemory);
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantsRepositoryInMemory);
  });

  it("Shoudl be able to update product data", async () => {
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
      promotion: true,
      restaurant_id: restaurant.id
    });

    const updatedProduct = await updateProductByIdUseCase.execute({
      id: product.id,
      name: "Product Test 2",
      image_product: "Image test",
      price: 2.50,
      category_id: "Category Test",
      promotion: true,
    });

    expect(updatedProduct.name).toBe("Product Test 2");

  });

  it("Should not be able to update a product if not exist", async () => {
    await expect(updateProductByIdUseCase.execute({
      id: "id test",
      name: "Product Test 2",
      image_product: "Image test",
      price: 2.50,
      category_id: "Category Test",
      promotion: true,
    })).rejects.toEqual(new AppError("Product does not exist"));
  });
});