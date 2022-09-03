import { ICreatePromotionDTO } from "../dtos/ICreatePromotionDTO";
import { IUpdatePromotionDTO } from "../dtos/IUpdatePromotionDTO";
import { Promotion } from "../infra/entities/Promotion";

interface IPromotionsRepository {
  create(data: ICreatePromotionDTO): Promise<Promotion>;
  listByProduct(id_product: string): Promise<Promotion[]>;
  findPromotionById(id: string): Promise<Promotion>;
  updatePromotionById(data: IUpdatePromotionDTO): Promise<Promotion>;
  deletePromotionById(id: string): Promise<void>;
};

export { IPromotionsRepository };