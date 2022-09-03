import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class RemoveUserTable1661819425530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("restaurants", "FKUserRestaurant");
        await queryRunner.dropColumn("restaurants", "user_id");
        await queryRunner.dropTable('users');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "isAdmin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        );

        await queryRunner.addColumn("restaurants", new TableColumn({
            name: "user_id",
            type: "uuid",
        }));

        await queryRunner.createForeignKey("restaurants",
            new TableForeignKey({
                name: 'FKUserRestaurant',
                referencedTableName: 'restaurants',
                referencedColumnNames: ['id'],
                columnNames: ['user_id'],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

}
