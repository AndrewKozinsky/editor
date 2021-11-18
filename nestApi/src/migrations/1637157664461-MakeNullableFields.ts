import {MigrationInterface, QueryRunner} from "typeorm";

export class MakeNullableFields1637157664461 implements MigrationInterface {
    name = 'MakeNullableFields1637157664461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artFolders" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "compFolders" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compFolders" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artFolders" ALTER COLUMN "content" SET NOT NULL`);
    }

}
