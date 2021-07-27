import {MigrationInterface, QueryRunner} from "typeorm";

export class SETNAME1627136930245 implements MigrationInterface {
    name = 'SETNAME1627136930245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "emailConfirmToken" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "passwordChangedAt" bigint NOT NULL DEFAULT '1627136933757', "passwordResetToken" character varying NOT NULL DEFAULT '', "passwordResetExpires" bigint NOT NULL DEFAULT '0', "language" character(3) NOT NULL DEFAULT 'eng', "createdAt" bigint NOT NULL DEFAULT '1627136933757', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
