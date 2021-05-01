import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AppleController } from "./apple.controller";
import { AddAppleHandler } from "./commands/add-apple/add-apple.handler";

@Module({
    controllers: [AppleController],
    imports: [CqrsModule],
    providers: [
        // Command handlers.
        AddAppleHandler
    ]
})
export class AppleModule {}
