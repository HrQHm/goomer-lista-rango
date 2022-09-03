import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AlterDataRestaurantUseCase } from './AlterDataRestaurantUseCase';

interface IFiles {
  filename: string;
}

class AlterDataRestaurantController {
  async handle(req: Request, res: Response): Promise<Response> {
    const alterDataRestaurantUseCase = container.resolve(AlterDataRestaurantUseCase);
    const { id } = req.params;
    const {
      name,
      address,
      weekDayOpen,
      weekDayClose,
      opening_time_week,
      closing_time_week,
      weekendOpen,
      weekendClose,
      opening_time_weekend,
      closing_time_weekend
    } = req.body;
    const image = req.file as IFiles;

    const updatedRestaurant = await alterDataRestaurantUseCase.execute({
      id,
      name,
      address,
      image_restaurant: image.filename,
      weekDayOpen,
      weekDayClose,
      opening_time_week,
      closing_time_week,
      weekendOpen,
      weekendClose,
      opening_time_weekend,
      closing_time_weekend
    });

    return res.status(201).json(updatedRestaurant);
  }
};

export { AlterDataRestaurantController };