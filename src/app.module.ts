import { typeormConfig } from "@app/domain/config";
import { TypeormConfig } from "@app/domain/config/interfaces";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResponsekitModule } from "@responsekit/nestjs";
import { AppleModule } from "./apple/apple.module";
import { OrangeModule } from "./orange/orange.module";

@Module({
    imports: [
        ResponsekitModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: "ormconfig.env",
                    load: [typeormConfig]
                })
            ],
            inject: [
                ConfigService
            ],
            useFactory: async (configService: ConfigService<TypeormConfig>) =>
                configService.get("options")
        }),
        // App modules.
        AppleModule,
        OrangeModule
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
