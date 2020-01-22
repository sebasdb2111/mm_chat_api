import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorChatSessionMessagesNullables1579690362678 implements MigrationInterface {
    name = 'refactorChatSessionMessagesNullables1579690362678'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_db4d8a73ed04017ab7c155ed930`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_d593d68f0d60623d74415c97255`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` CHANGE `customerId` `customerId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` CHANGE `psychicId` `psychicId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_db4d8a73ed04017ab7c155ed930` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_d593d68f0d60623d74415c97255` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_d593d68f0d60623d74415c97255`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP FOREIGN KEY `FK_db4d8a73ed04017ab7c155ed930`", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` CHANGE `psychicId` `psychicId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` CHANGE `customerId` `customerId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_d593d68f0d60623d74415c97255` FOREIGN KEY (`psychicId`) REFERENCES `psychic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD CONSTRAINT `FK_db4d8a73ed04017ab7c155ed930` FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
