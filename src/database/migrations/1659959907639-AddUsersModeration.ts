import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsersModeration1659959907639 implements MigrationInterface {
    name = 'AddUsersModeration1659959907639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "moderationStatus" character varying NOT NULL DEFAULT 'unmoderated'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "moderationComment" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "moderationComment"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "moderationStatus"`);
    }

}
