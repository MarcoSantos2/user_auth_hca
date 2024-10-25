import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyTable1729485227268 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE company (
                id INT NOT NULL AUTO_INCREMENT,
                uuid varchar(36) NOT NULL,
                name VARCHAR(255) NOT NULL,
                description TEXT NULL,
                created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
                updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
                deleted_at datetime(6) NULL, 
                PRIMARY KEY (id),
                UNIQUE INDEX IDX_company_uuid (uuid)
            ) ENGINE=InnoDB;
        `);
        await queryRunner.query(`
            CREATE TABLE user_companies_company
            (
                userId int NOT NULL, 
                companyId int NOT NULL, 
                INDEX IDX_user_companies_company_user_id (userId), 
                INDEX IDX_user_companies_company_company_id (companyId), 
                PRIMARY KEY (userId, companyId)
            ) ENGINE=InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE user_companies_company 
            ADD CONSTRAINT FK_user_companies_company_user_id
            FOREIGN KEY (userId) 
            REFERENCES user(id) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE user_companies_company 
            ADD CONSTRAINT FK_user_companies_company_company_id
            FOREIGN KEY (companyId) 
            REFERENCES company(id) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE user_companies_company DROP FOREIGN KEY FK_user_companies_company_company_id");
        await queryRunner.query("ALTER TABLE user_companies_company DROP FOREIGN KEY FK_user_companies_company_user_id");
        await queryRunner.query(`DROP TABLE user_companies_company`);
        await queryRunner.query(`DROP TABLE company`);
    }
}
