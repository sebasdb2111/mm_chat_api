import {MigrationInterface, QueryRunner} from "typeorm";

export class updateChatmessageWithIsimageCol1581412110869 implements MigrationInterface {
    name = 'updateChatmessageWithIsimageCol1581412110869'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chat_session_message` ADD `isImage` tinyint NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `chat_session_message` DROP COLUMN `isImage`", undefined);
    }

}
