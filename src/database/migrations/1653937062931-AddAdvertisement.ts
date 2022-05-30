import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdvertisement1653937062931 implements MigrationInterface {
    name = 'AddAdvertisement1653937062931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "price" numeric(18,2) NOT NULL, "currency" character varying(3) NOT NULL, "img" character varying NOT NULL, "weight" numeric(18,2) NOT NULL, "unit" character varying(5) NOT NULL, CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "advertisements"`);
    }

}
