import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserUuidToCompanyTable1725000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE company 
            ADD userUuid VARCHAR(36) NULL,
            ADD CONSTRAINT FK_userUuid FOREIGN KEY (userUuid) REFERENCES user(uuid) ON DELETE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE company 
            DROP FOREIGN KEY FK_userUuid,
            DROP COLUMN userUuid
        `);
    }
}
