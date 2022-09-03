import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterProductsAlterPromotionField1661474416440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "promotion");

        await queryRunner.addColumns("products", [
            new TableColumn({
                name: "promotion",
                type: "boolean",
                default: false
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "promotion");
        await queryRunner.addColumns("products", [
            new TableColumn({
                name: "promotion",
                type: "varchar",
                isNullable: true,
            }),
        ])
    }

}
