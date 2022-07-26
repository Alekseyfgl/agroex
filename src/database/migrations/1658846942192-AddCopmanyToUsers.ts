import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCopmanyToUsers1658846942192 implements MigrationInterface {
    name = 'AddCopmanyToUsers1658846942192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "name"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" character varying NOT NULL DEFAULT 'person'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "surname" character varying(50) DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "users" ADD "companyName" character varying DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "users" ADD "companyTaxNumber" character varying DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "users" ADD "bankAccount" character varying DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "users" ADD "certificateImage" character varying DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "certificateImage"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bankAccount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyTaxNumber"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyName"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "username"`);
    }

}
