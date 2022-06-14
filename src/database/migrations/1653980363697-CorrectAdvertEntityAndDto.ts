import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectAdvertEntityAndDto1653980363697
  implements MigrationInterface
{
  name = 'CorrectAdvertEntityAndDto1653980363697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "slug" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD CONSTRAINT "UQ_f817913e4944f6f152443b540fa" UNIQUE ("slug")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP CONSTRAINT "UQ_f817913e4944f6f152443b540fa"`,
    );
    await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "slug"`);
  }
}
