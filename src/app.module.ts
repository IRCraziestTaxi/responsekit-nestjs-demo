import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AppleModule } from "./apple/apple.module";
import { OrangeModule } from "./orange/orange.module";
import { ResponsekitModule } from "@responsekit/nestjs";

@Module({
    imports: [
        AppleModule,
        OrangeModule,
        ResponsekitModule.forRoot()
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
