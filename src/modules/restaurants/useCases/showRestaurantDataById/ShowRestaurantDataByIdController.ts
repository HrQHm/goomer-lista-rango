import { container } from "tsyringe";
import { Request, Response } from 'express';
import { ShowRestaurantDataByIdUseCase } from "./ShowRestaurantDataByIdUseCase";

class ShowRestaurantDataByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const showRestaurantDataByIdUseCase = container.resolve(ShowRestaurantDataByIdUseCase)
    const { id } = req.params;
    const restaurant = await showRestaurantDataByIdUseCase.execute(id);

    return res.status(201).json(restaurant);

  };
};

export { ShowRestaurantDataByIdController };