import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateArticle1637145196140 implements MigrationInterface {
    name = 'CreateArticle1637145196140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "name" character varying NOT NULL, "content" text NOT NULL, "siteTemplateId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
