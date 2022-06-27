import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotifications1655814836851 implements MigrationInterface {
  name = 'AddNotifications1655814836851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fireBaseTokens" ("userId" integer NOT NULL, "deviceType" character varying NOT NULL, "token" character varying NOT NULL, "isAllowed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_30602dd85d7b4ca7e785859290d" PRIMARY KEY ("userId", "deviceType"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "fireBaseTokens"`);
  }
}
