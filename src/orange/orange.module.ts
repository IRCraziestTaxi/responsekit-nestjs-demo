import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddOrangeHandler } from "./commands/add-orange/add-orange.handler";
import { OrangeController } from "./orange.controller";
import { Orange } from "./orange.entity";
import { GetOrangesHandler } from "./queries/get-oranges/get-oranges.handler";

@Module({
    controllers: [OrangeController],
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Orange])
        // Scoped option for LinqRepository for Orange. (Could not get to work.)
        // LinqRepositoryModule.forFeature([Orange])
    ],
    providers: [
        // Command handlers.
        AddOrangeHandler,
        // Query handlers.
        GetOrangesHandler
    ]
})
export class OrangeModule {}
