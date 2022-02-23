import {MigrationInterface, QueryRunner} from "typeorm";

export class Update21644917381434 implements MigrationInterface {
    name = 'Update21644917381434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "metaTemplateId" integer`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "meta" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "metaTemplateId"`);
    }

}
