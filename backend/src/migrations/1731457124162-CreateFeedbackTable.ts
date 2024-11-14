import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFeedbackTable1731457124162 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE feedback (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                feedback_text TEXT NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at DATETIME NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            ) ENGINE=InnoDB;
        `); 
    } 
    // We will likely use a third party service to store feedback, so when we hard delete a user, 
    // the feedback will be deleted from our database but not the third party service.
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE feedback`);
    }

}
