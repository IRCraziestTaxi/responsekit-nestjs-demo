import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AddOrangeHandler } from "./commands/add-orange/add-orange.handler";
import { OrangeController } from "./orange.controller";

@Module({
    controllers: [OrangeController],
    imports: [CqrsModule],
    providers: [
        // Command handlers.
        AddOrangeHandler
    ]
})
export class OrangeModule {}
