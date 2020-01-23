import {MigrationInterface, QueryRunner} from "typeorm";

export class creditEntity1579772069499 implements MigrationInterface {
    name = 'creditEntity1579772069499'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `credit` (`id` int NOT NULL AUTO_INCREMENT, `time` int NOT NULL, `coins` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `customerId` int NOT NULL, `psychicId` int NULL, UNIQUE INDEX `IDX_c98add8e192ded18b69c3e345a` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `credit` ADD CONSTRAINT `FK_af9d0a0c166ec5affe700acc842` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `credit` ADD CONSTRAINT `FK_1cded415aa0abd746997a690ce9` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `credit` DROP FOREIGN KEY `FK_1cded415aa0abd746997a690ce9`", undefined);
        await queryRunner.query("ALTER TABLE `credit` DROP FOREIGN KEY `FK_af9d0a0c166ec5affe700acc842`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c98add8e192ded18b69c3e345a` ON `credit`", undefined);
        await queryRunner.query("DROP TABLE `credit`", undefined);
    }

}
