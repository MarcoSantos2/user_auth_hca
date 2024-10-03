import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPermissionsAndLinks1727925302966 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE permission (
                id int NOT NULL AUTO_INCREMENT, 
                name varchar(255) NOT NULL, 
                description text NULL, 
                slug varchar(255) NOT NULL, 
                category_type enum ('user', 'operation_staff', 'admin_staff', 'client', 'calendar', 'role', 'admin_group', 'app_admin') NOT NULL DEFAULT 'user', 
                app_scope enum ('API', 'UI') NOT NULL DEFAULT 'UI', 
                created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
                updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
                deleted_at datetime(6) NULL, UNIQUE INDEX IDX_3379e3b123dac5ec10734b8cc8 (slug), 
                PRIMARY KEY (id)
            ) ENGINE=INNODB;
        `);

        await queryRunner.query(`
            CREATE TABLE permission_sub_permissions_permission (
                permissionId_1 int NOT NULL, 
                permissionId_2 int NOT NULL, 
                INDEX IDX_11a5aad37c884121166065d671 (permissionId_1), 
                INDEX IDX_92326dd7bb168e8619a12d223f (permissionId_2), 
                PRIMARY KEY (permissionId_1, permissionId_2)
            ) ENGINE=INNODB;
        `);

        await queryRunner.query(`
            CREATE TABLE role_permissions_permission (
                roleId int NOT NULL, 
                permissionId int NOT NULL, 
                INDEX IDX_b36cb2e04bc353ca4ede00d87b (roleId), 
                INDEX IDX_bfbc9e263d4cea6d7a8c9eb3ad (permissionId), 
                PRIMARY KEY (roleId, permissionId)
            ) ENGINE=INNODB;
        `);

        await queryRunner.query(`
            ALTER TABLE permission_sub_permissions_permission 
            ADD CONSTRAINT FK_11a5aad37c884121166065d6710 
            FOREIGN KEY (permissionId_1) 
            REFERENCES permission(id) ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE permission_sub_permissions_permission 
            ADD CONSTRAINT FK_92326dd7bb168e8619a12d223fa 
            FOREIGN KEY (permissionId_2) 
            REFERENCES permission(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE role_permissions_permission 
            ADD CONSTRAINT FK_b36cb2e04bc353ca4ede00d87b9 
            FOREIGN KEY (roleId) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE role_permissions_permission 
            ADD CONSTRAINT FK_bfbc9e263d4cea6d7a8c9eb3ad2 
            FOREIGN KEY (permissionId) 
            REFERENCES permission(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE role_permissions_permission`);
        await queryRunner.query(`DROP TABLE permission_sub_permissions_permission`);
        await queryRunner.query(`DROP TABLE permission`);
    }
}
