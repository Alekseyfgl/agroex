import { MigrationInterface, QueryRunner } from 'typeorm';

export class Categories21652253866695 implements MigrationInterface {
  name = 'Categories21652253866695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "categories" VALUES (1,'Dry fruits'),(2,'Crops'),(3,'Vegetables'),(4,'Fruits')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
