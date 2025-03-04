import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInviteUserToCompanyPermission1741054459742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE permission
            MODIFY category_type enum ('user', 'operation_staff', 'admin_staff', 'client', 'calendar', 'role', 'company') NOT NULL DEFAULT 'user';
        `);
        await queryRunner.query(`
            INSERT INTO permission (slug, description, name, category_type, app_scope) VALUES 
            ('POST:/api/companies/invite', 'Invite a user to a company', 'Invite User to Company', 'company', 'API');
        `);
    }

    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission WHERE slug = 'POST:/api/companies/invite';
        `);
        await queryRunner.query(`
            ALTER TABLE permission
            MODIFY category_type enum ('user', 'operation_staff', 'admin_staff', 'client', 'calendar', 'role', 'admin_group', 'app_admin') NOT NULL DEFAULT 'user';
        `);
    }
}
