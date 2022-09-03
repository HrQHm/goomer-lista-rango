import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPromotionsByProductUseCase } from './ListPromotionsByProductUseCase';

class ListPromotionByProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const listPromotionsByProductUseCase = container.resolve(ListPromotionsByProductUseCase);
    const promotions = await listPromotionsByProductUseCase.execute(id);

    return res.status(201).json(promotions);
  };
};

export { ListPromotionByProductController };