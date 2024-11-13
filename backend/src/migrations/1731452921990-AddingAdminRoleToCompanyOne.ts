import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAdminRoleToCompanyOne1731452921990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO role (name, description, slug, company_id, created_at, updated_at) VALUES 
            ('Internal Admin', 'Administrator with full access', 'InternalAdmin', 1, NOW(), NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM role WHERE slug = 'InternalAdmin' AND company_id = 1;
        `);
    }

}
