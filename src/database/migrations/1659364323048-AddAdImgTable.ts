import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdImgTable1659364323048 implements MigrationInterface {
    name = 'AddAdImgTable1659364323048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisementsImages" ("id" SERIAL NOT NULL, "img" character varying NOT NULL, "advertisement_id" integer, CONSTRAINT "PK_5626481d4299668ef8a15f1377c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisementsImages" ADD CONSTRAINT "FK_21efda51e56202723f6a12d62d8" FOREIGN KEY ("advertisement_id") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "advertisementsImages" ("advertisement_id", "img")
                                    SELECT "id", "img"
                                    FROM "advertisements"
                                    `);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "img"`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "img" character varying`);
        await queryRunner.query(`UPDATE "advertisements" A
                                    SET
                                    img = AI.img
                                    FROM "advertisementsImages" AI
                                    WHERE
                                    A.id = AI."advertisement_id"
                                    `);

        await queryRunner.query(`ALTER TABLE "advertisementsImages" DROP CONSTRAINT "FK_21efda51e56202723f6a12d62d8"`);
        await queryRunner.query(`DROP TABLE "advertisementsImages"`);
    }

}
