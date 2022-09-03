import { ProductsRepositoryInMemory } from "../../repositories/in-memory/ProductsRepositoryInMemory";
import { ListProductsByIdRestaurantUseCase } from "./ListProductsByIdRestaurantUseCase";

let listProductsByIdRestaurantUseCase: ListProductsByIdRestaurantUseCase;
let productsRepositoryInMemory: ProductsRepositoryInMemory;

describe("List all products by id restaurant", () => {
  beforeEach(() => {
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    listProductsByIdRestaurantUseCase = new ListProductsByIdRestaurantUseCase(productsRepositoryInMemory);
  });

  it("Should be able to list all products", async () => {
    await productsRepositoryInMemory.create({
      name: "Product test",
      image_product: "Image test",
      price: 2.50,
      category_id: "Category Test",
      promotion: true,
      restaurant_id: "1234"
    });

    await productsRepositoryInMemory.create({
      name: "Product test2",
      image_product: "Image test2",
      price: 2.50,
      category_id: "Category Test2",
      promotion: true,
      restaurant_id: "1234"
    });

    const products = await productsRepositoryInMemory.listByIdRestaurant("1234");
    expect(products).toHaveLength(2);
  });
});