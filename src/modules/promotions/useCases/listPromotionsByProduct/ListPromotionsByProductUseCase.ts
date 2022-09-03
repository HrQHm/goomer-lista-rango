import { inject, injectable } from "tsyringe";
import { weekdays } from "../../../../shared/DTO/WeekdayDTO";
import { IResponsePromotionDTO } from "../../dtos/IResponsePromotionDTO";
import { IPromotionsRepository } from "../../repositories/IPromotionsRepository";

@injectable()
class ListPromotionsByProductUseCase {
  constructor(
    @inject("PromotionsRepository")
    private promotionsRepository: IPromotionsRepository
  ) { }

  async execute(id_product: string): Promise<IResponsePromotionDTO[]> {
    const promotions = await this.promotionsRepository.listByProduct(id_product);
    const promotionList = promotions.map((promotion) => {
      return {
        id: promotion.id,
        description: promotion.description,
        day_promotion: weekdays[promotion.day_promotion],
        promotion_price: promotion.promotion_price,
        promotion_start_time: promotion.promotion_start_time,
        promotion_end_time: promotion.promotion_end_time,
        id_product: promotion.id_product,
      }
    });


    return promotionList;
  };
};

export { ListPromotionsByProductUseCase };
