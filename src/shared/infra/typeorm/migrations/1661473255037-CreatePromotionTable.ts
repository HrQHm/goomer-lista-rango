import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePromotionTable1661473255037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "promotions_products",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "id_product",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "day_promotion",
                    type: "numeric"
                },
                {
                    name: "promotion_price",
                    type: "numeric"
                },
                {
                    name: "promotion_start_time",
                    type: "varchar"
                },
                {
                    name: "promotion_end_time",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FkPromotionProduct",
                    referencedTableName: "products",
                    referencedColumnNames: ["id"],
                    columnNames: ["id_product"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("promotions_products");
    }
}