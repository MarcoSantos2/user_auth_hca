import { MigrationInterface, QueryRunner } from "typeorm";

export class DropUserCompanyRoleTable1725000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user_company_role`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
