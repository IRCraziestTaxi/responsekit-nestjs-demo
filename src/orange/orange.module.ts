import { Module } from "@nestjs/common";
import { OrangeController } from "./orange.controller";

@Module({
    controllers: [OrangeController]
})
export class OrangeModule {}
