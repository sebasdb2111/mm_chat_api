import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomerEntity1579255003095 implements MigrationInterface {
    name = 'CustomerEntity1579255003095'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `customer` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_b3f545096d909a009f53bd73d0` (`username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_b3f545096d909a009f53bd73d0` ON `customer`", undefined);
        await queryRunner.query("DROP TABLE `customer`", undefined);
    }

}
