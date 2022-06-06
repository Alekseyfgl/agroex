import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBetValue1654502870131 implements MigrationInterface {
    name = 'AddBetValue1654502870131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userBets" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "expireDays" TIMESTAMP DEFAULT now(), "betValue" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "advertisement_id" integer, CONSTRAINT "PK_7b72424a093e9be15416ff32467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userBets" ADD CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userBets" ADD CONSTRAINT "FK_de39b5a26cb8febb653184af295" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userBets" DROP CONSTRAINT "FK_de39b5a26cb8febb653184af295"`);
        await queryRunner.query(`ALTER TABLE "userBets" DROP CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155"`);

        await queryRunner.query(`DROP TABLE "userBets"`);
    }

}