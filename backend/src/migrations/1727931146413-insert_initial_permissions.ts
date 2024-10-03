import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertInitialPermissions1727931146413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO permission (slug, description, name, category_type, app_scope) VALUES 
            ('GET:/api/users', 'Retrieve a list of users', 'Get Users', 'user', 'API'),
            ('GET:/api/users/:uuid/add/role/:slug', 'Add a role to a specific user', 'Add Role to User', 'user', 'API'),
            ('POST:/api/users', 'Create a new user', 'Create User', 'user', 'API'),
            ('GET:/api/users/:id', 'Retrieve details of a specific user', 'Get User Details', 'user', 'API'),
            ('PATCH:/api/users/:id', 'Update a specific user', 'Update User', 'user', 'API'),
            ('DELETE:/api/users/:id', 'Delete a specific user', 'Delete User', 'user', 'API'),
            ('GET:/api/roles', 'Retrieve a list of roles', 'Get Roles', 'role', 'API'),
            ('GET:/api/roles/:slug/add/user/:uuid', 'Add a user to a specific role', 'Add User to Role', 'role', 'API'),
            ('GET:/api/roles/:slug/add/permission/:permission_slug', 'Add a permission to a specific role', 'Add Permission to Role', 'role', 'API'),
            ('POST:/api/roles/:slug/add/permissions', 'Assign multiple permissions to a role', 'Assign Permissions to Role', 'role', 'API'),
            ('POST:/api/roles', 'Create a new role', 'Create Role', 'role', 'API'),
            ('GET:/api/roles/:slug', 'Retrieve details of a specific role', 'Get Role Details', 'role', 'API'),
            ('PATCH:/api/roles/:slug', 'Update a specific role', 'Update Role', 'role', 'API'),
            ('DELETE:/api/roles/:slug', 'Delete a specific role', 'Delete Role', 'role', 'API');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM permission WHERE slug IN (
            'GET:/api/users',
            'GET:/api/users/:uuid/add/role/:slug',
            'POST:/api/users',
            'GET:/api/users/:id',
            'PATCH:/api/users/:id',
            'DELETE:/api/users/:id',
            'GET:/api/roles',
            'GET:/api/roles/:slug/add/user/:uuid',
            'GET:/api/roles/:slug/add/permission/:permission_slug',
            'POST:/api/roles/:slug/add/permissions',
            'POST:/api/roles',
            'GET:/api/roles/:slug',
            'PATCH:/api/roles/:slug',
            'DELETE:/api/roles/:slug'
            );
        `);
    }

}
