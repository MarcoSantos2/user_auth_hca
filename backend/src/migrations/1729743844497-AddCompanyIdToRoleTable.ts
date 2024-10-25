import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyIdToRoleTable1729743844497 implements MigrationInterface {
   
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO company (id, name, description, uuid) VALUES 
            (1,"app", "main company of the app", "00000000-0000-0000-0000-000000000000");
        `);
        await queryRunner.query(
            "ALTER TABLE role ADD company_id INT NOT NULL DEFAULT 1"
        );

        await queryRunner.query(
            "ALTER TABLE role ADD CONSTRAINT FK_role_company FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE role DROP FOREIGN KEY FK_role_company"
        );

        await queryRunner.query(
            "ALTER TABLE role DROP COLUMN company_id"
        );
        await queryRunner.query(
            "DELETE FROM company WHERE id = 1"
        );
    }
}
