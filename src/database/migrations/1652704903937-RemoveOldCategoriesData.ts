import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveOldCategoriesData1652704903937
  implements MigrationInterface
{
  name = 'RemoveOldCategoriesData1652704903937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "categories"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
