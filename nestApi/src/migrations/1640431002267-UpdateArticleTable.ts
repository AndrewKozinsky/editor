import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateArticleTable1640431002267 implements MigrationInterface {
    name = 'UpdateArticleTable1640431002267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "updatedAt"`);
    }

}
