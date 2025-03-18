import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertResendCompanyInvitationPermission1742270833079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO permission (slug, description, name, category_type, app_scope) VALUES 
            ('POST:/api/companies/invitation/resend', 'Resend a company invitation email', 'Resend Company Invitation', 'company', 'API');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission WHERE slug = 'POST:/api/companies/invitation/resend';
        `);
    }
}
