import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultValue1637222617541 implements MigrationInterface {
    name = 'AddDefaultValue1637222617541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "content" SET NOT NULL`);
    }

}
