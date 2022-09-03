import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdatePromotionByIdUseCase } from './UpdatePromotionByIdUseCase';

class UpdatePromotionByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
    } = req.body;

    const updatePromotionByIdUseCase = container.resolve(UpdatePromotionByIdUseCase);
    const updatePromotion = await updatePromotionByIdUseCase.execute({
      id,
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
    });

    return res.status(201).json(updatePromotion);
  }
};

export { UpdatePromotionByIdController };