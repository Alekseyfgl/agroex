import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestMigrationToReleaseOnHeroku1652795778549
  implements MigrationInterface
{
  name = 'TestMigrationToReleaseOnHeroku1652795778549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "categories" VALUES (5,'Cereals')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
