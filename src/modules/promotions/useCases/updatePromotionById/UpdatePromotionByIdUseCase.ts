import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { IResponsePromotionDTO } from "../../dtos/IResponsePromotionDTO";
import { IUpdatePromotionDTO } from "../../dtos/IUpdatePromotionDTO";
import { IPromotionsRepository } from "../../repositories/IPromotionsRepository";

@injectable()
class UpdatePromotionByIdUseCase {
  constructor(
    @inject("PromotionsRepository")
    private promotionsRepository: IPromotionsRepository
  ) { }

  async execute({
    id,
    description,
    day_promotion,
    promotion_price,
    promotion_start_time,
    promotion_end_time,
  }: IUpdatePromotionDTO): Promise<IResponsePromotionDTO> {
    const startTimePromotion = dayjs(`2022-01-01 ${promotion_start_time}`);
    const endTimePromotion = dayjs(`2022-01-01 ${promotion_end_time}`);
    const minutesPromotion = endTimePromotion.diff(startTimePromotion, "minutes", true);

    if (minutesPromotion < 15) {
      throw new AppError("Promotion time must be at least 15 minutes long")
    };

    const promotionUpdated = await this.promotionsRepository.updatePromotionById({
      id,
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
    });

    return {
      id,
      description: promotionUpdated.description,
      day_promotion: weekdays[promotionUpdated.day_promotion],
      promotion_price: promotionUpdated.promotion_price,
      promotion_start_time: promotionUpdated.promotion_start_time,
      promotion_end_time: promotionUpdated.promotion_end_time,
      id_product: promotionUpdated.id_product
    }
  };
};

export { UpdatePromotionByIdUseCase };