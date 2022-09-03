import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { ICreatePromotionDTO } from "../../dtos/ICreatePromotionDTO";
import { IResponsePromotionDTO } from "../../dtos/IResponsePromotionDTO";
import { Promotion } from "../../infra/entities/Promotion";
import { IPromotionsRepository } from "../../repositories/IPromotionsRepository";

@injectable()
class CreatePromotionUseCase {
  constructor(
    @inject("PromotionsRepository")
    private promotionsRepository: IPromotionsRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) { }
  async execute({
    description,
    day_promotion,
    promotion_price,
    promotion_start_time,
    promotion_end_time,
    id_product,
  }: ICreatePromotionDTO): Promise<IResponsePromotionDTO> {

    const productExist = await this.productsRepository.findById(id_product);
    if (!productExist) {
      throw new AppError("Product not found");
    };

    const startTimePromotion = dayjs(`2022-01-01 ${promotion_start_time}`);
    const endTimePromotion = dayjs(`2022-01-01 ${promotion_end_time}`);
    const minutesPromotion = endTimePromotion.diff(startTimePromotion, "minutes", true);

    if (minutesPromotion < 15) {
      throw new AppError("Promotion time must be at least 15 minutes long")
    }

    await this.productsRepository.updatePromotion(id_product, true);

    const promotion = await this.promotionsRepository.create({
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
      id_product,
    });

    return {
      id: promotion.id,
      description: promotion.description,
      day_promotion: weekdays[promotion.day_promotion],
      promotion_price: promotion.promotion_price,
      promotion_start_time: promotion.promotion_start_time,
      promotion_end_time: promotion.promotion_end_time,
      id_product: promotion.id_product,
    };
  }
};

export { CreatePromotionUseCase };