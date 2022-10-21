import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { typeormConfig } from "../libs/domain/src/config";
import { Apple } from "../src/apple/apple.entity";
import { Orange } from "../src/orange/orange.entity";

config({
    path: "ormconfig.env"
});

const dataSource = new DataSource({
    ...typeormConfig().options as DataSourceOptions,
    // Override runtime options' empty migrations.
    migrations: [
        ".typeorm/migrations/*.ts"
    ],
    // typeorm won't recognize @nestjs/typeorm's autoLoadEntities option. Load entities manually for migrations.
    entities: [
        Apple,
        Orange
    ]
});
dataSource.initialize();

export default dataSource;
