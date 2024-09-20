import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGooglePayloadTable1726449831039 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE google_payload (
                id INT AUTO_INCREMENT PRIMARY KEY,
                google_id VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                sub VARCHAR(255) NOT NULL,
                user_id INT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE google_payload`);
    }
}

