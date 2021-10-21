import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppleController } from "./apple.controller";
import { Apple } from "./apple.entity";
import { AppleRepository } from "./apple.repository";
import { AddAppleHandler } from "./commands/add-apple/add-apple.handler";
import { GetApplesHandler } from "./queries/get-apples/get-apples.handler";

@Module({
    controllers: [AppleController],
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Apple])
    ],
    providers: [
        AppleRepository,
        // Command handlers.
        AddAppleHandler,
        // Query handlers.
        GetApplesHandler
    ]
})
export class AppleModule {}
