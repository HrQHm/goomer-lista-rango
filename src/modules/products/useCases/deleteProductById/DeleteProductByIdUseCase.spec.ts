import { RestaurantsRepositoryInMemory } from "../../../restaurants/repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../../../restaurants/useCases/createRestaurant/CreateRestaurantUseCase";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { DeleteProductByIdUseCase } from "./DeleteProductByIdUseCase";

let deleteProductByIdUseCase: DeleteProductByIdUseCase;
let createRestaurantUseCase: CreateRestaurantUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;
let restaurantsRepositoryInMemory: RestaurantsRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;


describe("Delete product by id", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    restaurantsRepositoryInMemory = new RestaurantsRepositoryInMemory();
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantsRepositoryInMemory);
    deleteProductByIdUseCase = new DeleteProductByIdUseCase(productsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory, restaurantsRepositoryInMemory);
  });

  it("should be able to delete a products by id", async () => {
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

    await deleteProductByIdUseCase.execute(product.id);
    const listProducts = await productsRepositoryInMemory.listByIdRestaurant(restaurant.id);
    expect(listProducts).toHaveLength(0);
  });
});