import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserEntityEmailAndRole1579085580238 implements MigrationInterface {
    name = 'updateUserEntityEmailAndRole1579085580238'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_f4ca2c1e7c96ae6e8a7cca9df8` ON `user` (`username`, `email`)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_f4ca2c1e7c96ae6e8a7cca9df8` ON `user`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user` (`username`)", undefined);
    }

}
