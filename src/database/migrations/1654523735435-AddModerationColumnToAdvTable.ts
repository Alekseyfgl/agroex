import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddModerationColumnToAdvTable1654523735435
  implements MigrationInterface
{
  name = 'AddModerationColumnToAdvTable1654523735435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "moderationComment" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "moderationComment"`,
    );
  }
}
