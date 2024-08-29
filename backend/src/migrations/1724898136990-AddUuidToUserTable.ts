import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUuidToUserTable1724898136990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE user ADD uuid varchar(36) NOT NULL",
        )

        await queryRunner.query(
            "ALTER TABLE user ADD UNIQUE INDEX IDX_a95e949168be7b7ece1a2382fe (uuid)",
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE user DROP COLUMN uuid",
        )
    }
}
