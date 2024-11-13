import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFeedbackTable1731457124162 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE feedback (
                id INT NOT NULL AUTO_INCREMENT,
                user_uuid VARCHAR(255) NOT NULL,
                feedback_text TEXT NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at DATETIME NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (user_uuid) REFERENCES user(uuid)
            ) ENGINE=InnoDB;
        `); 
    } // should we delete feedback on cascade if a user is deleted? if so, we need to add ON DELETE CASCADE to the foreign key
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE feedback`);
    }

}
