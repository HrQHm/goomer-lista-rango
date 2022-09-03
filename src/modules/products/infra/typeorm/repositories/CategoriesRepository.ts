import { injectable } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import { ICreateCategoryDTO } from "../../../dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

@injectable()
class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = await this.repository.create({
      name,
      description
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    const categoryQuery = await this.repository
      .createQueryBuilder("categories")
      .where("categories.name = :name", { name });

    const category = await categoryQuery.getOne();
    return category;
  }

}

export { CategoriesRepository };