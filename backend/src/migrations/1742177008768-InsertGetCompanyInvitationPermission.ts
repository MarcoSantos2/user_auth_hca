import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertGetCompanyInvitationPermission1742177008768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO permission (slug, description, name, category_type, app_scope) VALUES 
            ('GET:/api/companies/invitations', 'Retrieve a list of company invitations', 'Get Company Invitations', 'company', 'API');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission WHERE slug = 'GET:/api/companies/invitations';
        `);
    }
}
