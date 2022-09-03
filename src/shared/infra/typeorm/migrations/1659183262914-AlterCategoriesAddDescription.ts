import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCategoriesAddDescription1659183262914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "categories", new TableColumn({
                name: "description",
                type: "varchar"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("categories", "description");
    }
}
