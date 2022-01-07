import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPrices1641474811672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'prices',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: false
                },
                {
                    name: 'from_ddd_id',
                    type: 'varchar'
                },
                {
                    name: 'to_ddd_id',
                    type: 'varchar'
                },
                {
                    name: 'charge',
                    type: 'decimal',
                    scale: 10,
                    precision: 2
                }
            ],
            foreignKeys: [
                {
                    name: 'FK_from_ddd',
                    columnNames: ['from_ddd_id'],
                    referencedTableName: 'ddds',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'FK_to_ddd',
                    columnNames: ['to_ddd_id'],
                    referencedTableName: 'ddds',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('prices')
    }

}
