import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateSite1635763547797 implements MigrationInterface {
    name = 'UpdateSite1635763547797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sites" RENAME COLUMN "defaultIncFilesTemplateId" TO "defaultSiteTemplateId"`);
        await queryRunner.query(`ALTER TABLE "sites" DROP COLUMN "defaultSiteTemplateId"`);
        await queryRunner.query(`ALTER TABLE "sites" ADD "defaultSiteTemplateId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sites" DROP COLUMN "defaultSiteTemplateId"`);
        await queryRunner.query(`ALTER TABLE "sites" ADD "defaultSiteTemplateId" character varying`);
        await queryRunner.query(`ALTER TABLE "sites" RENAME COLUMN "defaultSiteTemplateId" TO "defaultIncFilesTemplateId"`);
    }

}
