import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteProductByIdUseCase } from './DeleteProductByIdUseCase';

class DeleteProductByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProductByIdUseCase = container.resolve(DeleteProductByIdUseCase);

    await deleteProductByIdUseCase.execute(id);
    return res.status(204).send();
  }
};

export { DeleteProductByIdController }