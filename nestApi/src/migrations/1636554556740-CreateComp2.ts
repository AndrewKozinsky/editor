import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateComp21636554556740 implements MigrationInterface {
    name = 'CreateComp21636554556740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP COLUMN "compFolderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" ADD "compFolderId" integer NOT NULL`);
    }

}
