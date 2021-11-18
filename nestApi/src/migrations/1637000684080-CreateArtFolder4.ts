import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateArtFolder41637000684080 implements MigrationInterface {
    name = 'CreateArtFolder41637000684080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artFolders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_be4b22807c0e4da705baf3f3c6e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "artFolders"`);
    }

}
