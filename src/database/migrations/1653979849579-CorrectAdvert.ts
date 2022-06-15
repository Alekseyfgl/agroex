import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectAdvert1653979849579 implements MigrationInterface {
  name = 'CorrectAdvert1653979849579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "title" character varying(200) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "price" numeric(18,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "currency" character varying(3) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "weight"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "weight" numeric(18,2) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "unit"`);
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "unit" character varying(5) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "unit"`);
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "unit" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "weight"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "weight" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "currency"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "currency" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "title" character varying NOT NULL`,
    );
  }
}
