import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCronJobs1654774017528 implements MigrationInterface {
  name = 'AddCronJobs1654774017528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cronJobs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "jobType" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "targetId" integer NOT NULL, CONSTRAINT "PK_8d6395d577c72fdb5fc97a9d956" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "isActive" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "expireAdvert" TIMESTAMP DEFAULT now() + interval '3 days'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "expireAdvert"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "isActive"`,
    );
    await queryRunner.query(`DROP TABLE "cronJobs"`);
  }
}
