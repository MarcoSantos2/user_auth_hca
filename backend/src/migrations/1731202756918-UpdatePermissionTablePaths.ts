import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePermissionTablePaths1731202756918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/admin/companies' 
            WHERE slug = 'GET:/api/companies/all'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/admin/users' 
            WHERE slug = 'GET:/api/users'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/admin/roles' 
            WHERE slug = 'GET:/api/roles'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/companies/all' 
            WHERE slug = 'GET:/api/admin/companies'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/users' 
            WHERE slug = 'GET:/api/admin/users'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/roles' 
            WHERE slug = 'GET:/api/admin/roles'
        `);
    }
}
