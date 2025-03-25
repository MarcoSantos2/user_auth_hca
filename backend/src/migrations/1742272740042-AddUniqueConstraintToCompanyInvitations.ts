import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToCompanyInvitations1742272740042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE company_invitations 
            ADD CONSTRAINT unique_company_email 
            UNIQUE (company_uuid, invitee_email);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE company_invitations 
            DROP CONSTRAINT unique_company_email;
        `);
    }
}
