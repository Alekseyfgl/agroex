import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddStatusAndRemoveBetTimeout1655113386403
  implements MigrationInterface
{
  name = 'AddAddStatusAndRemoveBetTimeout1655113386403';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "userBets" DROP COLUMN "expireBet"`);
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "moderationStatus" character varying NOT NULL DEFAULT 'unmoderated'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "moderationStatus"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD "expireBet" TIMESTAMP DEFAULT (now() + '03:00:00')`,
    );
  }
}
