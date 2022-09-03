import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeletePromotionByIdUseCase } from './DeletePromotionByIdUseCase';


class DeletePromotionByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deletePromotionByIdUseCase = container.resolve(DeletePromotionByIdUseCase);
    await deletePromotionByIdUseCase.execute(id);

    return res.status(204).send();
  }
};

export { DeletePromotionByIdController };