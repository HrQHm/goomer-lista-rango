import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1659795070023 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "price",
                        type: "numeric"
                    },
                    {
                        name: "image_product",
                        type: "varchar"
                    },
                    {
                        name: "promotion",
                        type: "varchar"
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "restaurant_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FkCategoryProduct",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FkRestaurantProduct",
                        referencedTableName: "restaurants",
                        referencedColumnNames: ["id"],
                        columnNames: ["restaurant_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }
}
