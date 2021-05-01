import { Module } from "@nestjs/common";
import { AppleController } from "./apple.controller";

@Module({
    controllers: [AppleController]
})
export class AppleModule {}
