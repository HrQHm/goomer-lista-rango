import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateProductByUseCase } from './UpdateProductByIdUseCase';

interface IFileName {
  filename: string;
};

class UpdateProductByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      price,
      promotion,
      category_id,
    } = req.body;
    const updateProductByIdUseCase = container.resolve(UpdateProductByUseCase);
    const image = req.file as IFileName;

    const productUpdated = await updateProductByIdUseCase.execute({
      id,
      category_id,
      name,
      image_product: image.filename,
      price,
      promotion: promotion === "true",
    });

    return res.status(201).json(productUpdated);
  }
};

export { UpdateProductByIdController };