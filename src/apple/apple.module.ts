import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppleController } from "./apple.controller";
import { Apple } from "./apple.entity";
import { AddAppleHandler } from "./commands/add-apple/add-apple.handler";
import { GetApplesHandler } from "./queries/get-apples/get-apples.handler";

@Module({
    controllers: [AppleController],
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Apple])
        // Scoped option for LinqRepository for Apple. (Could not get to work.)
        // LinqRepositoryModule.forFeature([Apple])
    ],
    providers: [
        // Command handlers.
        AddAppleHandler,
        // Query handlers.
        GetApplesHandler
    ]
})
export class AppleModule {}
