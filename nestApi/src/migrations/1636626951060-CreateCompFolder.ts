import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCompFolder1636626951060 implements MigrationInterface {
    name = 'CreateCompFolder1636626951060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "compFolders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_10104a10a5ae15e78efdb8e18eb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "compFolders"`);
    }

}
