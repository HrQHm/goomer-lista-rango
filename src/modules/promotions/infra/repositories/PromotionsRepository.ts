import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { ICreatePromotionDTO } from "../../dtos/ICreatePromotionDTO";
import { IUpdatePromotionDTO } from "../../dtos/IUpdatePromotionDTO";
import { IPromotionsRepository } from "../../repositories/IPromotionsRepository";
import { Promotion } from "../entities/Promotion";

@injectable()
class PromotionsRepository implements IPromotionsRepository {
  private repository: Repository<Promotion>

  constructor() {
    this.repository = getRepository(Promotion);
  }

  async create({
    description,
    day_promotion,
    promotion_price,
    promotion_start_time,
    promotion_end_time,
    id_product,
  }: ICreatePromotionDTO): Promise<Promotion> {
    const promotion = await this.repository.create({
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
      id_product
    });

    await this.repository.save(promotion);
    return promotion;
  };

  async listByProduct(id_product: string): Promise<Promotion[]> {

    const promotionListQuery = await this.repository
      .createQueryBuilder("promotions_products")
      .where("promotions_products.id_product = :id_product", { id_product });

    const promotions = await promotionListQuery.getMany();
    return promotions;

  };

  async findPromotionById(id: string): Promise<Promotion> {
    const promotion = await this.repository
      .createQueryBuilder("promotions_products")
      .where("promotions_products.id = :id", { id })
      .getOne();

    return promotion;
  };

  async updatePromotionById({
    id,
    description,
    day_promotion,
    promotion_price,
    promotion_start_time,
    promotion_end_time,
  }: IUpdatePromotionDTO): Promise<Promotion> {
    await this.repository.createQueryBuilder()
      .update("promotions_products")
      .set({
        description,
        day_promotion,
        promotion_price,
        promotion_start_time,
        promotion_end_time,
      })
      .where("id = :id", { id })
      .execute();

    const updatedPromotion = await this.findPromotionById(id);

    return updatedPromotion;
  };

  async deletePromotionById(id: string): Promise<void> {
    await this.repository.createQueryBuilder()
      .delete()
      .from("promotions_products")
      .where("id = :id", { id })
      .execute()
  };

};

export { PromotionsRepository };