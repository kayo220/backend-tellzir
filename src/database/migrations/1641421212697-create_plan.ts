import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPlan1641421212697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'plans',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: false
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'free_time_limit',
                    type: 'int'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('plans');
    }

}
