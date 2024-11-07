import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustCompaniesPermissionsPath1730961730226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/companies/all'
            WHERE slug = 'GET:/api/companies'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/companies'
            WHERE slug = 'GET:/api/companies/:uuid'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'DELETE:/api/companies'
            WHERE slug = 'DELETE:/api/companies/:uuid'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'PATCH:/api/companies'
            WHERE slug = 'PATCH:/api/companies/:uuid'
        `);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/companies/:uuid'
            WHERE slug = 'GET:/api/companies'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'GET:/api/companies'
            WHERE slug = 'GET:/api/companies/all'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'DELETE:/api/companies/:uuid'
            WHERE slug = 'DELETE:/api/companies'
        `);
        await queryRunner.query(`
            UPDATE permission 
            SET slug = 'PATCH:/api/companies/:uuid'
            WHERE slug = 'PATCH:/api/companies'
        `);
    }

}
