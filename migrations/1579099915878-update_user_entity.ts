import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserEntity1579099915878 implements MigrationInterface {
    name = 'updateUserEntity1579099915878'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `firstName` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `lastName` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `isActive` tinyint NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `isActive`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastLogin`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastName`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstName`", undefined);
    }

}
