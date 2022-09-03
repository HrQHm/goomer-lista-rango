import { injectable, inject } from "tsyringe";
import { IPromotionsRepository } from "../../repositories/IPromotionsRepository";

@injectable()
class DeletePromotionByIdUseCase {
  constructor(
    @inject("PromotionsRepository")
    private promotionsRepository: IPromotionsRepository
  ) { }

  async execute(id: string): Promise<void> {
    await this.promotionsRepository.deletePromotionById(id);
  };
};

export { DeletePromotionByIdUseCase };