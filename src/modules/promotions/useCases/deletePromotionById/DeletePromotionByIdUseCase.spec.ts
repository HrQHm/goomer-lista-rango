import { AppError } from "../../../../shared/errors/AppError";
import { ProductsRepositoryInMemory } from "../../../products/repositories/in-memory/ProductsRepositoryInMemory";
import { CreateProductUseCase } from "../../../products/useCases/createProduct/CreateProductUseCase";
import { RestaurantsRepositoryInMemory } from "../../../restaurants/repositories/in-memory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../../../restaurants/useCases/createRestaurant/CreateRestaurantUseCase";
import { PromotionsRepositoryInMemory } from "../../repositories/in-memory/PromotionsRepositoryInMemory";
import { CreatePromotionUseCase } from "../createPromotion/CreatePromotionUseCase";
import { DeletePromotionByIdUseCase } from "./DeletePromotionByIdUseCase";


let productsRepositoryInMemory: ProductsRepositoryInMemory;
let promotionsRepositoryInMemory: PromotionsRepositoryInMemory;
let restaurantsRepositoryInMemory: RestaurantsRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;
let createRestaurantUseCase: CreateRestaurantUseCase;
let createPromotionUseCase: CreatePromotionUseCase;
let deletePromotionByIdUseCase: DeletePromotionByIdUseCase;

describe("Delete promotion by id", () => {
  beforeEach(() => {
    restaurantsRepositoryInMemory = new RestaurantsRepositoryInMemory();
    productsRepositoryInMemory = new ProductsRepositoryInMemory();
    promotionsRepositoryInMemory = new PromotionsRepositoryInMemory();
    createRestaurantUseCase = new CreateRestaurantUseCase(restaurantsRepositoryInMemory);
    createProductUseCase = new CreateProductUseCase(productsRepositoryInMemory, restaurantsRepositoryInMemory);
    createPromotionUseCase = new CreatePromotionUseCase(promotionsRepositoryInMemory, productsRepositoryInMemory);
    deletePromotionByIdUseCase = new DeletePromotionByIdUseCase(promotionsRepositoryInMemory);
  });

  it("Should be able to delete a promotion by id", async () => {
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
    });

    const promotion = await createPromotionUseCase.execute({
      description: "Promotion test",
      day_promotion: 1,
      promotion_price: 5.00,
      promotion_start_time: "12:00",
      promotion_end_time: "16:00",
      id_product: product.id,
    });


    await deletePromotionByIdUseCase.execute(promotion.id);
    const promotionList = await promotionsRepositoryInMemory.listByProduct(product.id);
    expect(promotionList).toHaveLength(0);
  });
});