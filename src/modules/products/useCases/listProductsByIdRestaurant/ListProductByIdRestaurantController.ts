import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListProductsByIdRestaurantUseCase } from './ListProductsByIdRestaurantUseCase';

class ListProductByIdRestaurantController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const listProductsByIdRestaurantUseCase = container.resolve(ListProductsByIdRestaurantUseCase);

    const products = await listProductsByIdRestaurantUseCase.execute(id);

    return res.status(201).json(products);
  }
};

export { ListProductByIdRestaurantController }