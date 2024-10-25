import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRolesTable1725000000001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE user_roles_role 
            (
                userId int NOT NULL, 
                roleId int NOT NULL, 
                INDEX IDX_5f9286e6c25594c6b88c108db7 (userId), 
                INDEX IDX_4be2f7adf862634f5f803d246b (roleId), 
                PRIMARY KEY (userId, roleId)
            ) ENGINE=InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE user_roles_role 
            ADD CONSTRAINT FK_5f9286e6c25594c6b88c108db77 
            FOREIGN KEY (userId) 
            REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE user_roles_role 
            ADD CONSTRAINT FK_4be2f7adf862634f5f803d246b8 
            FOREIGN KEY (roleId) 
            REFERENCES role(id) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user_roles_role`);
    }
}
