import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRestaurantUseCase } from './CreateRestaurantUseCase';

interface IFiles {
  filename: string;
}

class CreateRestaurantController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      weekDayOpen,
      weekDayClose,
      opening_time_week,
      closing_time_week,
      weekendOpen,
      weekendClose,
      opening_time_weekend,
      closing_time_weekend,
      address
    } = req.body;
    const image = req.file as IFiles;

    const createRestaurantUseCase = container.resolve(CreateRestaurantUseCase);
    const restaurant = await createRestaurantUseCase.execute({
      name,
      image_restaurant: image.filename,
      weekDayOpen,
      weekDayClose,
      opening_time_week,
      closing_time_week,
      weekendOpen,
      weekendClose,
      opening_time_weekend,
      closing_time_weekend,
      address
    });

    return res.status(201).json(restaurant);
  }
};

export { CreateRestaurantController };