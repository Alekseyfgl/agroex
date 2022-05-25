import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRoles1653475466635 implements MigrationInterface {
    name = 'AddRoles1653475466635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying, "banned" boolean NOT NULL DEFAULT false, "banReason" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userRoles" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "role_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f51275374b5fb007ccf0fff9806" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_bb7d685810f5cba57e9ff6756fb" UNIQUE ("value"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "img" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "userRoles" ADD CONSTRAINT "FK_355bdf8bfdd624c430cdd1a2299" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userRoles" ADD CONSTRAINT "FK_6b12772f8fad7c583492d64dec0" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userRoles" DROP CONSTRAINT "FK_6b12772f8fad7c583492d64dec0"`);
        await queryRunner.query(`ALTER TABLE "userRoles" DROP CONSTRAINT "FK_355bdf8bfdd624c430cdd1a2299"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "img" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "userRoles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
