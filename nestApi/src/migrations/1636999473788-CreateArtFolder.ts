import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateArtFolder1636999473788 implements MigrationInterface {
    name = 'CreateArtFolder1636999473788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compFolders" DROP COLUMN "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compFolders" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
