import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1621355597228 implements MigrationInterface {
    name = 'Initial1621355597228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `apple` (`id` int NOT NULL AUTO_INCREMENT, `weight` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `orange` (`id` int NOT NULL AUTO_INCREMENT, `weight` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `orange`");
        await queryRunner.query("DROP TABLE `apple`");
    }

}
