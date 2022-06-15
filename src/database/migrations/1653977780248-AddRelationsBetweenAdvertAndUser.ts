import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenAdvertAndUser1653977780248
  implements MigrationInterface
{
  name = 'AddRelationsBetweenAdvertAndUser1653977780248';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "advertisements" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "currency" character varying NOT NULL, "img" character varying NOT NULL, "weight" integer NOT NULL, "unit" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "advertisements" ADD CONSTRAINT "FK_04c5a9a2606a3a2f448e3b49896" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "advertisements" DROP CONSTRAINT "FK_04c5a9a2606a3a2f448e3b49896"`,
    );
    await queryRunner.query(`DROP TABLE "advertisements"`);
  }
}
