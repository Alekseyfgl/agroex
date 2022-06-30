import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImgColumn1652887471637 implements MigrationInterface {
  name = 'AddImgColumn1652887471637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ADD COLUMN "img" character varying;`,
    );
    await queryRunner.query(
      `UPDATE "categories" SET "img" = 'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1krN4q56_oS1ZBedGvbBCvrEAgxmA5kzJ'`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "img" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ALTER COLUMN "img" DROP NOT NULL`,
    );
  }
}
