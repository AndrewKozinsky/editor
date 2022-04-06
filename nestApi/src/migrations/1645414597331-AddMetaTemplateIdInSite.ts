import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMetaTemplateIdInSite1645414597331 implements MigrationInterface {
    name = 'AddMetaTemplateIdInSite1645414597331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sites" ADD "defaultMetaTemplateId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sites" DROP COLUMN "defaultMetaTemplateId"`);
    }

}
