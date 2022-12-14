import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create a new Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("Should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);
    expect(createdCategory).toHaveProperty("id");
  });


  it("Should not be able to create a new category with name exist", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    await expect(createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new AppError("Category already exist.", 422));
  });
});