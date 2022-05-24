import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewData1652704927595 implements MigrationInterface {
  name = 'AddNewData1652704927595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "categories" VALUES (4,'Fruits'),(2,'Crops'),(1,'Dry fruits'),(3,'Vegetables')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
