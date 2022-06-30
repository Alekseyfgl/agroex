import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectAdvert1654162005172 implements MigrationInterface {
  name = 'CorrectAdvert1654162005172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "country" character varying(100) `,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "location" character varying `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "location"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "country"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "description" character varying`,
    );
  }
}
