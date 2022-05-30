import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateForAdvertisement1653938197923 implements MigrationInterface {
    name = 'AddDateForAdvertisement1653938197923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "createAt"`);
    }

}
