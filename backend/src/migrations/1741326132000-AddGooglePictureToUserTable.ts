import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGooglePictureToUserTable1741326132000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user 
            ADD COLUMN picture_url VARCHAR(255) NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user 
            DROP COLUMN picture_url;
        `);
    }
}
