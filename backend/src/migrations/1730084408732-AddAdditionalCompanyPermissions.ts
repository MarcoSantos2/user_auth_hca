import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdditionalCompanyPermissions1730084408732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO permission (slug, description, name, category_type, app_scope) VALUES 
            ('GET:/api/companies/:uuid', 'Retrieve a specific company by UUID', 'Get Company', 'admin_staff', 'API'),
            ('PATCH:/api/companies/:uuid', 'Update a specific company', 'Update Company', 'admin_staff', 'API'),
            ('DELETE:/api/companies/:uuid', 'Delete a specific company', 'Delete Company', 'admin_staff', 'API'),
            ('GET:/api/companies', 'Retrieve a list of all companies', 'Get All Companies', 'admin_staff', 'API');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission WHERE slug IN (
                'GET:/api/companies/:uuid',
                'PATCH:/api/companies/:uuid',
                'DELETE:/api/companies/:uuid',
                'GET:/api/companies'
            );
        `);
    }

}
