import { ICreatePromotionDTO } from "../../dtos/ICreatePromotionDTO";
import { IUpdatePromotionDTO } from "../../dtos/IUpdatePromotionDTO";
import { Promotion } from "../../infra/entities/Promotion";
import { IPromotionsRepository } from "../IPromotionsRepository";

class PromotionsRepositoryInMemory implements IPromotionsRepository {

  promotions: Promotion[] = [];

  async create({
    description,
    day_promotion,
    promotion_price,
    promotion_start_time,
    promotion_end_time,
    id_product,
  }: ICreatePromotionDTO): Promise<Promotion> {
    const promotion = new Promotion();

    Object.assign(promotion, ({
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
      id_product,
    }));

    this.promotions.push(promotion);
    return promotion;
  };

  async listByProduct(id_product: string): Promise<Promotion[]> {
    const promotions = this.promotions.filter((promotion) => promotion.id_product === id_product);
    return promotions;
  };

  async findPromotionById(id: string): Promise<Promotion> {
    return this.promotions.find(promotion => promotion.id === id);
  };

  async updatePromotionById({
    id,
    description,
    day_promotion,
    promotion_price,
    promotion_start_time,
    promotion_end_time,
  }: IUpdatePromotionDTO): Promise<Promotion> {
    const findIndex = this.promotions.findIndex((promotion) => promotion.id === id);
    this.promotions[findIndex].description = description;
    this.promotions[findIndex].day_promotion = day_promotion;
    this.promotions[findIndex].promotion_price = promotion_price;
    this.promotions[findIndex].promotion_start_time = promotion_start_time;
    this.promotions[findIndex].promotion_end_time = promotion_end_time;

    return this.promotions[findIndex];
  };

  async deletePromotionById(id: string): Promise<void> {
    const promotion = this.promotions.find((promotion) => promotion.id === id);
    this.promotions.splice(this.promotions.indexOf(promotion));
  }

};

export { PromotionsRepositoryInMemory };