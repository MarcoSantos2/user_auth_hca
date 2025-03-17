import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyInvitationsTable1742171405839 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE company_invitations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                invitee_email VARCHAR(255) NOT NULL,
                invitee_name VARCHAR(255) NOT NULL,
                inviter_uuid VARCHAR(36),
                company_uuid VARCHAR(36) NOT NULL,
                token VARCHAR(500) NOT NULL,
                accepted BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE company_invitations;
        `);
    }
}
