import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectAdvertEntityAndDto1654070295708
  implements MigrationInterface
{
  name = 'CorrectAdvertEntityAndDto1654070295708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "category" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "subCategory" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "isModerated" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" RENAME COLUMN "weight" TO "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "isModerated"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "subCategory"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "category"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" RENAME COLUMN "quantity" TO "weight"`,
    );
  }
}
