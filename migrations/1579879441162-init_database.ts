import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabase1579879441162 implements MigrationInterface {
    name = 'initDatabase1579879441162'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `payment_method` (`id` int NOT NULL AUTO_INCREMENT, `method` enum ('PAYPAL', 'CREDITCARD') NOT NULL DEFAULT 'PAYPAL', UNIQUE INDEX `IDX_7744c2b2dd932c9cf42f2b9bc3` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `offer` (`id` int NOT NULL AUTO_INCREMENT, `type` enum ('TIME', 'COIN') NOT NULL DEFAULT 'COIN', `price` int NOT NULL, `currency` enum ('EUR') NOT NULL DEFAULT 'EUR', `quantity` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_57c6ae1abe49201919ef68de90` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `psychic_offer` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `offerId` int NOT NULL, `psychicId` int NOT NULL, UNIQUE INDEX `IDX_c83fb97424937d692efcd21fe9` (`id`), UNIQUE INDEX `REL_0027a29d677a56ac9496032199` (`psychicId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `transaction` (`id` int NOT NULL AUTO_INCREMENT, `total` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `paymentMethodId` int NOT NULL, `psychicOfferId` int NOT NULL, `customerId` int NOT NULL, UNIQUE INDEX `IDX_89eadb93a89810556e1cbcd6ab` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `customer` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_7035dcfd3c22467d2e1cc3e193` (`id`, `username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `credit` (`id` int NOT NULL AUTO_INCREMENT, `time` int NULL, `coins` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `customerId` int NOT NULL, `psychicId` int NULL, `transactionId` int NOT NULL, UNIQUE INDEX `IDX_c98add8e192ded18b69c3e345a` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `psychic` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_d139702976aa58705a903e7a25` (`id`, `username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `lastLogin` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_cd31913550dca61bd410900cdb` (`id`, `username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `chat_session` (`id` int NOT NULL AUTO_INCREMENT, `isActive` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `ownerId` int NOT NULL, `psychicId` int NOT NULL, `userId` int NULL, UNIQUE INDEX `IDX_9017c2ee500cd1ba895752a0aa` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `chat_session_message` (`id` int NOT NULL AUTO_INCREMENT, `message` varchar(255) NOT NULL, `deleted` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `chatSessionId` int NOT NULL, `customerId` int NULL, `psychicId` int NULL, `userId` int NULL, UNIQUE INDEX `IDX_7af08fbbc3e9507bc7de7c5d78` (`id`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `psychic_offer` ADD CONSTRAINT `FK_c7a6ccee2728c363a6025625153` FOREIGN KEY (`offerId`) REFERENCES `offer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `psychic_offer` ADD CONSTRAINT `FK_0027a29d677a56ac94960321997` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_406318e2ddca3828d340ec9151f` FOREIGN KEY (`paymentMethodId`) REFERENCES `payment_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_9a2c9c19377f81c4511c925972f` FOREIGN KEY (`psychicOfferId`) REFERENCES `psychic_offer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_16ead8467f1f71ac7232aa46ad3` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `credit` ADD CONSTRAINT `FK_af9d0a0c166ec5affe700acc842` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `credit` ADD CONSTRAINT `FK_1cded415aa0abd746997a690ce9` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `credit` ADD CONSTRAINT `FK_c1c4a15eed80e6669542f8c0eaa` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` ADD CONSTRAINT `FK_cd3b2278f325c6a1459bbf36bbd` FOREIGN KEY (`ownerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` ADD CONSTRAINT `FK_0d57f7a5f1334ccf281fd8a03b6` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` ADD CONSTRAINT `FK_b371c02a2bc22cb175ded401292` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_ad00f36963288aa8dd558ad4772` FOREIGN KEY (`chatSessionId`) REFERENCES `chat_session`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_db4d8a73ed04017ab7c155ed930` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_d593d68f0d60623d74415c97255` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_98729eed20a83464e0fc48c3601` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        // ///////////////////////////////////////////////////////////////////////////////
        // INSERTS ¡¡¡Uncomment these insertion lines only if you are in development!!! //
        // ///////////////////////////////////////////////////////////////////////////////
        // await queryRunner.query("INSERT INTO `mm_chat`.`offer` (`type`, `price`, `quantity`, `createdAt`, `updatedAt`) VALUES ('COIN', 3, 30, '2020-01-23 12:40:47.713000', '2020-01-23 12:40:47.713000')", undefined);
        // await queryRunner.query("INSERT INTO `mm_chat`.`user` (`username`, `password`, `email`, `role`, `firstName`, `lastName`, `lastLogin`, `isActive`, `createdAt`, `updatedAt`) VALUES ('ADMIN', '$2a$08$Jlci5fNeg0hsENCZt0NI8uZOFKBphcUDlrw7fyTohMub3Y1.efBbC', 'admin@admin.com', 'ADMIN', 'Admin', 'Administrator', '2020-01-23 12:43:50.518000', true, '2020-01-23 12:43:50.518000', '2020-01-23 12:43:50.518000')", undefined);
        // await queryRunner.query("INSERT INTO `mm_chat`.`psychic` (`username`, `password`, `email`, `firstName`, `lastName`, `lastLogin`, `isActive`, `createdAt`, `updatedAt`) VALUES ('pepa', '$2a$08$69SRgD74drmo/jr6GzNer.ZIPj4bNsPnwOEQcLDb5IjSnddkmoVWm', 'pepa@pepa.com', 'Pepa', 'Pepita', '2020-01-23 12:43:50.518000', true, '2020-01-23 12:43:50.518000', '2020-01-23 12:43:50.518000')", undefined);
        // await queryRunner.query("INSERT INTO `mm_chat`.`payment_method` (`method`) VALUES ('PAYPAL')", undefined);
        // await queryRunner.query("INSERT INTO `mm_chat`.`payment_method` (`method`) VALUES ('CREDITCARD')", undefined);
        // await queryRunner.query("INSERT INTO `mm_chat`.`psychic_offer` (`createdAt`, `updatedAt`, `offerId`, `psychicId` ) VALUES ('2020-01-23 12:43:50.518000', '2020-01-23 12:43:50.518000', 1, 1)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_98729eed20a83464e0fc48c3601`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_d593d68f0d60623d74415c97255`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_db4d8a73ed04017ab7c155ed930`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_ad00f36963288aa8dd558ad4772`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` DROP FOREIGN KEY `FK_b371c02a2bc22cb175ded401292`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` DROP FOREIGN KEY `FK_0d57f7a5f1334ccf281fd8a03b6`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session` DROP FOREIGN KEY `FK_cd3b2278f325c6a1459bbf36bbd`", undefined);
        await queryRunner.query("ALTER TABLE `credit` DROP FOREIGN KEY `FK_c1c4a15eed80e6669542f8c0eaa`", undefined);
        await queryRunner.query("ALTER TABLE `credit` DROP FOREIGN KEY `FK_1cded415aa0abd746997a690ce9`", undefined);
        await queryRunner.query("ALTER TABLE `credit` DROP FOREIGN KEY `FK_af9d0a0c166ec5affe700acc842`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_16ead8467f1f71ac7232aa46ad3`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_9a2c9c19377f81c4511c925972f`", undefined);
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_406318e2ddca3828d340ec9151f`", undefined);
        await queryRunner.query("ALTER TABLE `psychic_offer` DROP FOREIGN KEY `FK_0027a29d677a56ac94960321997`", undefined);
        await queryRunner.query("ALTER TABLE `psychic_offer` DROP FOREIGN KEY `FK_c7a6ccee2728c363a6025625153`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7af08fbbc3e9507bc7de7c5d78` ON `chat_session_message`", undefined);
        await queryRunner.query("DROP TABLE `chat_session_message`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9017c2ee500cd1ba895752a0aa` ON `chat_session`", undefined);
        await queryRunner.query("DROP TABLE `chat_session`", undefined);
        await queryRunner.query("DROP INDEX `IDX_cd31913550dca61bd410900cdb` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d139702976aa58705a903e7a25` ON `psychic`", undefined);
        await queryRunner.query("DROP TABLE `psychic`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c98add8e192ded18b69c3e345a` ON `credit`", undefined);
        await queryRunner.query("DROP TABLE `credit`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7035dcfd3c22467d2e1cc3e193` ON `customer`", undefined);
        await queryRunner.query("DROP TABLE `customer`", undefined);
        await queryRunner.query("DROP INDEX `IDX_89eadb93a89810556e1cbcd6ab` ON `transaction`", undefined);
        await queryRunner.query("DROP TABLE `transaction`", undefined);
        await queryRunner.query("DROP INDEX `REL_0027a29d677a56ac9496032199` ON `psychic_offer`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c83fb97424937d692efcd21fe9` ON `psychic_offer`", undefined);
        await queryRunner.query("DROP TABLE `psychic_offer`", undefined);
        await queryRunner.query("DROP INDEX `IDX_57c6ae1abe49201919ef68de90` ON `offer`", undefined);
        await queryRunner.query("DROP TABLE `offer`", undefined);
        await queryRunner.query("DROP INDEX `IDX_7744c2b2dd932c9cf42f2b9bc3` ON `payment_method`", undefined);
        await queryRunner.query("DROP TABLE `payment_method`", undefined);
    }

}
