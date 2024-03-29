import { TypeormConfig } from "./interfaces";

export const typeormConfig = (): TypeormConfig => ({
    options: {
        type: process.env.TYPEORM_CONNECTION as any,
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT),
        database: process.env.TYPEORM_DATABASE,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        // At runtime, ignore migrations.
        migrations: [],
        autoLoadEntities: true
    }
});
