import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBets1654452465813 implements MigrationInterface {
    name = 'AddBets1654452465813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bets" ("id" SERIAL NOT NULL, "bet" character varying NOT NULL, CONSTRAINT "PK_7ca91a6a39623bd5c21722bcedd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userBets" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "bet_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7b72424a093e9be15416ff32467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userBets" ADD CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userBets" ADD CONSTRAINT "FK_d28515aaf83f134029cc81cd8fd" FOREIGN KEY ("bet_id") REFERENCES "bets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userBets" DROP CONSTRAINT "FK_d28515aaf83f134029cc81cd8fd"`);
        await queryRunner.query(`ALTER TABLE "userBets" DROP CONSTRAINT "FK_7da61e64e4163d7cc7f75e83155"`);
        await queryRunner.query(`DROP TABLE "userBets"`);
        await queryRunner.query(`DROP TABLE "bets"`);
    }

}
