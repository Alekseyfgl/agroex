import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoles1653572596686 implements MigrationInterface {
  name = 'AddRoles1653572596686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "userRoles" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "role_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f51275374b5fb007ccf0fff9806" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "roles" VALUES (1,'user','Пользователь'),(2,'admin','Администратор'),(3,'moderator','Модератор')`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "banned" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "banReason" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "image" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "userRoles" ADD CONSTRAINT "FK_355bdf8bfdd624c430cdd1a2299" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userRoles" ADD CONSTRAINT "FK_6b12772f8fad7c583492d64dec0" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userRoles" DROP CONSTRAINT "FK_6b12772f8fad7c583492d64dec0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userRoles" DROP CONSTRAINT "FK_355bdf8bfdd624c430cdd1a2299"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banReason"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banned"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" character varying NOT NULL DEFAULT 'registered'`,
    );
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "userRoles"`);
  }
}
