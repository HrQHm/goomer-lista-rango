import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRestaurantsUseCase } from './ListRestaurantsUseCase';

class ListRestaurantsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listRestaurantsUseCase = container.resolve(ListRestaurantsUseCase);
    const restaurant = await listRestaurantsUseCase.execute();

    return res.status(201).json(restaurant);
  }
};

export { ListRestaurantsController };