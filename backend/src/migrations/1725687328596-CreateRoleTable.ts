import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleTable1725000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE role (
                id int NOT NULL AUTO_INCREMENT,
                name varchar(255) NOT NULL,
                description text,
                slug varchar(255) NOT NULL,
                created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                PRIMARY KEY (id),
                UNIQUE INDEX IDX_role_name (name),
                UNIQUE INDEX IDX_role_slug (slug)
            ) ENGINE=InnoDB;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE role`);
    }
}