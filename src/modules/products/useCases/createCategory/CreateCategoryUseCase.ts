import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute({ name, description }: IRequest) {

    const categoryAlreadyExist = await this.categoriesRepository.findByName(name);
    if (categoryAlreadyExist) {
      throw new AppError("Category already exist.", 422);
    }

    this.categoriesRepository.create({ name, description });
  };
};

export { CreateCategoryUseCase };