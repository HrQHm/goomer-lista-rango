import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterRestaurantsAddAdress1659877547358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("restaurants", new TableColumn({
            name: "address",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("restaurants", "address");
    }

}
