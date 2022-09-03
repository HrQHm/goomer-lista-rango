import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterRestaurantsAddSchedule1660401176623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("restaurants", "opening_hours");

        await queryRunner.addColumns("restaurants", [
            new TableColumn({
                name: "weekDayOpen",
                type: "numeric",
                isNullable: true,
            }),

            new TableColumn({
                name: "weekDayClose",
                type: "numeric",
                isNullable: true,
            }),

            new TableColumn({
                name: "opening_time_week",
                type: "varchar",
                isNullable: true,
            }),

            new TableColumn({
                name: "closing_time_week",
                type: "varchar",
                isNullable: true,
            }),

            new TableColumn({
                name: "weekendOpen",
                type: "numeric",
                isNullable: true,
            }),

            new TableColumn({
                name: "weekendClose",
                type: "numeric",
                isNullable: true,
            }),

            new TableColumn({
                name: "opening_time_weekend",
                type: "varchar",
                isNullable: true,
            }),

            new TableColumn({
                name: "closing_time_weekend",
                type: "varchar",
                isNullable: true,
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("restaurants", [
            "weekDayOpen",
            "weekDayClose",
            "opening_time_week",
            "closing_time_week",
            "weekendOpen",
            "weekendClose",
            "opening_time_weekend",
            "closing_time_weekend"
        ]);

        await queryRunner.addColumn("restaurants", new TableColumn({
            name: "opening_hours",
            type: "varchar",
            isNullable: true
        }))
    }

}
