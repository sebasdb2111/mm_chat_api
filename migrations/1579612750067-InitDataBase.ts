import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDataBase1579612750067 implements MigrationInterface {
    name = 'InitDataBase1579612750067'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `psychic` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_d139702976aa58705a903e7a25` (`id`, `username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `customer` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_7035dcfd3c22467d2e1cc3e193` (`id`, `username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_cd31913550dca61bd410900cdb` (`id`, `username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `chat_session` (`id` int NOT NULL AUTO_INCREMENT, `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ownerId` int NOT NULL, `psychicId` int NOT NULL, `userId` int NULL, UNIQUE INDEX `IDX_9017c2ee500cd1ba895752a0aa` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `chat_session_message` (`id` int NOT NULL AUTO_INCREMENT, `message` varchar(255) NOT NULL, `deleted` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `chatSessionId` int NOT NULL, `customerId` int NOT NULL, `psychicId` int NOT NULL, `userId` int NULL, UNIQUE INDEX `IDX_7af08fbbc3e9507bc7de7c5d78` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` ADD CONSTRAINT `FK_cd3b2278f325c6a1459bbf36bbd` FOREIGN KEY (`ownerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` ADD CONSTRAINT `FK_0d57f7a5f1334ccf281fd8a03b6` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` ADD CONSTRAINT `FK_b371c02a2bc22cb175ded401292` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_ad00f36963288aa8dd558ad4772` FOREIGN KEY (`chatSessionId`) REFERENCES `chat_session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_db4d8a73ed04017ab7c155ed930` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_d593d68f0d60623d74415c97255` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_98729eed20a83464e0fc48c3601` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_98729eed20a83464e0fc48c3601`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_d593d68f0d60623d74415c97255`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_db4d8a73ed04017ab7c155ed930`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_ad00f36963288aa8dd558ad4772`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` DROP FOREIGN KEY `FK_b371c02a2bc22cb175ded401292`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` DROP FOREIGN KEY `FK_0d57f7a5f1334ccf281fd8a03b6`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` DROP FOREIGN KEY `FK_cd3b2278f325c6a1459bbf36bbd`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7af08fbbc3e9507bc7de7c5d78` ON `chat_session_message`", undefined);
        await queryRunner.query("DROP TABLE `chat_session_message`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9017c2ee500cd1ba895752a0aa` ON `chat_session`", undefined);
        await queryRunner.query("DROP TABLE `chat_session`", undefined);
        await queryRunner.query("DROP INDEX `IDX_cd31913550dca61bd410900cdb` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7035dcfd3c22467d2e1cc3e193` ON `customer`", undefined);
        await queryRunner.query("DROP TABLE `customer`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d139702976aa58705a903e7a25` ON `psychic`", undefined);
        await queryRunner.query("DROP TABLE `psychic`", undefined);
    }

}
