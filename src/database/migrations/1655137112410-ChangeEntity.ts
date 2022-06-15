import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeEntity1655137112410 implements MigrationInterface {
  name = 'ChangeEntity1655137112410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cronJobs" ALTER COLUMN "date" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "cronJobs" ALTER COLUMN "date" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "description" TYPE character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "description" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "advertisement_id" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "created_at" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "created_at" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "betValue" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "isActive" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" TYPE character varying(50)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" TYPE character varying(18)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "banReason" TYPE character varying(200)`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "country" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "location" TYPE character varying(300)`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "location" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "category" TYPE character varying(100)`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "category" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "subCategory" TYPE character varying(100)`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "expireAdvert" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "expireAdvert" SET DEFAULT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "createAt" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "createAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "createAt" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "updatedAt" TYPE TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "updatedAt" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "updatedAt" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "createAt" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "createAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "createAt" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "expireAdvert" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "expireAdvert" SET DEFAULT now() + interval '3 days'`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "subCategory" TYPE character varying`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "category" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "category" DROP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "location" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "location" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "advertisements" ALTER COLUMN "country" DROP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "banReason" TYPE character varying`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "isActive" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "betValue" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "created_at" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "created_at" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userBets" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );

    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "description" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ALTER COLUMN "description" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "cronJobs" ALTER COLUMN "date" TYPE TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "cronJobs" ALTER COLUMN "date" SET NOT NULL`,
    );
  }
}
