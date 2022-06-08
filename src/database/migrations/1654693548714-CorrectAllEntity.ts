import { MigrationInterface, QueryRunner } from 'typeorm';

export class CorrectAllEntity1654693548714 implements MigrationInterface {
  name = 'CorrectAllEntity1654693548714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userBets" DROP CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" DROP CONSTRAINT "FK_de39b5a26cb8febb653184af295"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "advertisement_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "userBets" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "userBets" DROP COLUMN "expireBet"`);
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD "expireBet" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "betValue" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "isActive" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying(50)`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying(18)`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "location"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "location" character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "createAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "title" character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD CONSTRAINT "FK_de39b5a26cb8febb653184af295" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userBets" DROP CONSTRAINT "FK_de39b5a26cb8febb653184af295"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" DROP CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155"`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "createAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP COLUMN "location"`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD "location" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "country" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "isActive" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "betValue" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "userBets" DROP COLUMN "expireBet"`);
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD "expireBet" TIMESTAMP DEFAULT (now() + '03:00:00')`,
    );
    await queryRunner.query(`ALTER TABLE "userBets" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "advertisement_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD CONSTRAINT "FK_de39b5a26cb8febb653184af295" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ADD CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
