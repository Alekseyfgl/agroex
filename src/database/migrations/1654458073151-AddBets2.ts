import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBets21654458073151 implements MigrationInterface {
    name = 'AddBets21654458073151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userBets" ADD "advertisement_id" integer`);
        await queryRunner.query(`ALTER TABLE "userBets" ADD CONSTRAINT "FK_de39b5a26cb8febb653184af295" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userBets" DROP CONSTRAINT "FK_de39b5a26cb8febb653184af295"`);
        await queryRunner.query(`ALTER TABLE "userBets" DROP COLUMN "advertisement_id"`);
    }

}
