import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorTimeColCreditEntity1579773410981 implements MigrationInterface {
    name = 'refactorTimeColCreditEntity1579773410981'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `credit` CHANGE `time` `time` int NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `credit` CHANGE `time` `time` int NOT NULL", undefined);
    }

}
