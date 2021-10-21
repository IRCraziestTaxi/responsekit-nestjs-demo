import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ResponsekitModule } from "@responsekit/nestjs";
import { AppleModule } from "./apple/apple.module";
import { OrangeModule } from "./orange/orange.module";

@Module({
    imports: [
        ResponsekitModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: "ormconfig.env"
                })
            ],
            inject: [
                ConfigService
            ],
            useFactory: async (configService: ConfigService) => ({
                type: configService.get("TYPEORM_CONNECTION"),
                host: configService.get("TYPEORM_HOST"),
                port: parseInt(configService.get("TYPEORM_PORT")),
                database: configService.get("TYPEORM_DATABASE"),
                username: configService.get("TYPEORM_USERNAME"),
                password: configService.get("TYPEORM_PASSWORD"),
                // Unfortunately this is necessary in order to use
                // typeorm with a webpack build...
                // Can omit this using autoLoadEntities: true
                // and TypeOrmModule.forFeature in feature modules.
                // entities: [
                //     Apple,
                //     Orange
                // ],
                // At runtime, ignore migrations.
                migrations: [],
                autoLoadEntities: true
            } as TypeOrmModuleOptions)
        }),
        // App modules.
        AppleModule,
        OrangeModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
