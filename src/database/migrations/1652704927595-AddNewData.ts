import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewData1652704927595 implements MigrationInterface {
  name = 'AddNewData1652704927595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "categories" VALUES (4,'Fruits'),(2,'Crops'),(1,'Dry fruits'),(3,'Vegetables')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
