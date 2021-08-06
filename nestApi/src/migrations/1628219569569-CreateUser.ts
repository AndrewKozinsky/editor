import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1628219569569 implements MigrationInterface {
    name = 'CreateUser1628219569569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "emailConfirmToken" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "passwordChangedAt" bigint NOT NULL DEFAULT '0', "passwordResetToken" character varying NOT NULL DEFAULT '', "passwordResetExpires" bigint NOT NULL DEFAULT '0', "language" character(3) NOT NULL DEFAULT 'eng', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
