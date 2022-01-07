import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createDDD1641474463957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ddds',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: false
                },
                {
                    name: 'code',
                    type: 'varchar'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ddds');
    }

}
