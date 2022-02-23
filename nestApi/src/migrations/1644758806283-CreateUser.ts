import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1644758806283 implements MigrationInterface {
    name = 'CreateUser1644758806283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artFolders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text, CONSTRAINT "PK_be4b22807c0e4da705baf3f3c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "name" character varying NOT NULL, "content" text, "siteTemplateId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "compFolders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text, CONSTRAINT "PK_10104a10a5ae15e78efdb8e18eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "components" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0d742661c63926321b5f5eac1ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "metaTemplates" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2c647acb42fb814c2bbb9183718" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sites" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer NOT NULL, "defaultSiteTemplateId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4f5eccb1dfde10c9170502595a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "siteTemplates" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3e307985ff733abd80e0bbdefac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "emailConfirmToken" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "passwordChangedAt" TIMESTAMP NOT NULL, "passwordResetToken" character varying NOT NULL DEFAULT '', "passwordResetExpires" TIMESTAMP, "language" character(3) NOT NULL DEFAULT 'eng', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "siteTemplates"`);
        await queryRunner.query(`DROP TABLE "sites"`);
        await queryRunner.query(`DROP TABLE "metaTemplates"`);
        await queryRunner.query(`DROP TABLE "components"`);
        await queryRunner.query(`DROP TABLE "compFolders"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "artFolders"`);
    }

}
