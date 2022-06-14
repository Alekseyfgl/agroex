import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteTestMigration1652797450357 implements MigrationInterface {
  name = 'DeleteTestMigration1652797450357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "categories" WHERE "id" = 5;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
