import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserCompanyRoleTable1729483909638 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE user_company_role (
                id INT NOT NULL AUTO_INCREMENT,
                userId INT NOT NULL,
                companyId INT NOT NULL,
                roleId INT NOT NULL,
                PRIMARY KEY (id),
                INDEX IDX_userId (userId),
                INDEX IDX_companyId (companyId),
                INDEX IDX_roleId (roleId),
                CONSTRAINT FK_userId FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT FK_companyId FOREIGN KEY (companyId) REFERENCES company(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT FK_roleId FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE NO ACTION ON UPDATE NO ACTION
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user_company_role`);
    }
}