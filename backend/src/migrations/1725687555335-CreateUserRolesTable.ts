import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRolesTable1725000000001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE user_roles (
                id int NOT NULL AUTO_INCREMENT,
                role_id int NOT NULL,
                user_id int NOT NULL,
                created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id),
                FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user_roles`);
    }
}
