import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1652940417297 implements MigrationInterface {
  name = 'User1652940417297';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'registered', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
