import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectUserEntity1654071784439 implements MigrationInterface {
  name = 'CorrectUserEntity1654071784439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "banReason" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "banReason" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "banReason" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "banReason" SET NOT NULL`,
    );
  }
}
