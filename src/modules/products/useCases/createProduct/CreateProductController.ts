import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';

interface IFiles {
  filename: string;
}

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      price,
      category_id,
      restaurant_id,
      promotion
    } = req.body;

    const image = req.file as IFiles;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute({
      name,
      image_product: image.filename,
      price,
      category_id,
      restaurant_id,
      promotion
    });

    return res.status(201).json(product);
  }
};

export { CreateProductController };