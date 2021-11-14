import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateComp1636551673416 implements MigrationInterface {
    name = 'CreateComp1636551673416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "components" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "siteId" integer NOT NULL, "compFolderId" integer NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0d742661c63926321b5f5eac1ad" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "components"`);
    }

}
