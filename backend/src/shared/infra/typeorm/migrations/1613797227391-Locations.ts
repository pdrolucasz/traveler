import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Locations1613797227391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'locations',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'image',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'address_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'city_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: 'LocationCategory',
                        columnNames: ['category_id'],
                        referencedTableName: 'categories',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'LocationAddress',
                        columnNames: ['address_id'],
                        referencedTableName: 'addresses',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                    {
                        name: 'LocationCity',
                        columnNames: ['city_id'],
                        referencedTableName: 'cities',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('locations')
    }

}
