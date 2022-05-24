import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewTables1653384523603 implements MigrationInterface {
  name = 'NewTables1653384523603';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying, "image" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
        `ALTER TABLE "categories" ADD COLUMN "img" character varying;`,
    );
    await queryRunner.query(
        `UPDATE "categories" SET "img" = 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1krN4q56_oS1ZBedGvbBCvrEAgxmA5kzJ'`,
    );
    await queryRunner.query(
        `ALTER TABLE "categories" ALTER COLUMN "img" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
