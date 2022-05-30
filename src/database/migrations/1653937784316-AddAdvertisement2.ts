import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdvertisement21653937784316 implements MigrationInterface {
    name = 'AddAdvertisement21653937784316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "description"`);
    }

}
