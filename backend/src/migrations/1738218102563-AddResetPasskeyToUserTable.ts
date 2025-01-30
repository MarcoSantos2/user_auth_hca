import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResetPasskeyToUserTable1738218102563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user 
            ADD COLUMN reset_passkey VARCHAR(6) NULL,
            ADD COLUMN reset_passkey_exp DATETIME NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE user 
            DROP COLUMN reset_passkey,
            DROP COLUMN reset_passkey_exp;
        `);
    }
}
