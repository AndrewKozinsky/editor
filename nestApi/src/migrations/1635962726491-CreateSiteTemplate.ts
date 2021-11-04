import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSiteTemplate1635962726491 implements MigrationInterface {
    name = 'CreateSiteTemplate1635962726491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "siteTemplates" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3e307985ff733abd80e0bbdefac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "siteTemplates"`);
    }

}
