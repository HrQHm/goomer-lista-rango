import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteRestaurantByIdUseCase } from './DeleteRestaurantByIdUseCase';

class DeleteRestaurantByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteRestaurantByIdUseCase = container.resolve(DeleteRestaurantByIdUseCase);

    await deleteRestaurantByIdUseCase.execute(id);

    return res.status(204).send();
  }
};

export { DeleteRestaurantByIdController };