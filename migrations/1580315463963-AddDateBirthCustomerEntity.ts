import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateBirthCustomerEntity1580315463963 implements MigrationInterface {
    name = 'AddDateBirthCustomerEntity1580315463963'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `customer` ADD `dateBirth` datetime NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `customer` DROP COLUMN `dateBirth`", undefined);
    }

}
