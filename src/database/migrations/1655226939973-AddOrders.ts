import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrders1655226939973 implements MigrationInterface {
  name = 'AddOrders1655226939973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "isConfirmed" boolean DEFAULT false`,
    );

    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "dealStatus" character varying(20) NOT NULL DEFAULT 'confirmed', "bet_id" integer, "orderCreated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_44a7c9eea026f76eb237db2d68" UNIQUE ("bet_id"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_44a7c9eea026f76eb237db2d683" FOREIGN KEY ("bet_id") REFERENCES "userBets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "isConfirmed"`,
    );

    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_44a7c9eea026f76eb237db2d683"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
