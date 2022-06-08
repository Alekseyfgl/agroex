import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCronJobs1654696084741 implements MigrationInterface {
    name = 'AddCronJobs1654696084741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cronJobs" ("id" SERIAL NOT NULL, "name" character varying(300) NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "betId" character varying NOT NULL, CONSTRAINT "PK_8d6395d577c72fdb5fc97a9d956" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cronJobs"`);
    }

}
