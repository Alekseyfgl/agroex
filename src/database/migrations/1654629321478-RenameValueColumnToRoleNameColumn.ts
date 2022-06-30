import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameValueColumnToRoleNameColumn1654629321478
  implements MigrationInterface
{
  name = 'RenameValueColumnToRoleNameColumn1654629321478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME COLUMN "value" TO "roleName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" TO "UQ_992f24b9d80eb1312440ca577f1"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME CONSTRAINT "UQ_992f24b9d80eb1312440ca577f1" TO "UQ_bb7d685810f5cba57e9ff6756fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME COLUMN "roleName" TO "value"`,
    );
  }
}
