import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePromotionUseCase } from './CreatePromotionUseCase';

class CreatePromotionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
    } = req.body;


    const createPromotionUseCase = container.resolve(CreatePromotionUseCase);
    const product = await createPromotionUseCase.execute({
      description,
      day_promotion,
      promotion_price,
      promotion_start_time,
      promotion_end_time,
      id_product: id
    });

    return res.status(201).json(product);
  }
};

export { CreatePromotionController };