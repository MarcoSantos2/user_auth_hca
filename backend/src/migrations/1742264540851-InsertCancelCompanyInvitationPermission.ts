import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertCancelCompanyInvitationPermission1742264540851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO permission (slug, description, name, category_type, app_scope) VALUES 
            ('DELETE:/api/companies/invitation', 'Cancel a pending company invitation', 'Cancel Company Invitation', 'company', 'API');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission WHERE slug = 'DELETE:/api/companies/invitation';
        `);
    }
}
