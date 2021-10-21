import { Global, Module } from "@nestjs/common";
// import { AppleRepository } from "./repositories/apple.repository";
// import { OrangeRepository } from "./repositories/orange.repository";

/**
 * You would import this module in AppModule if you frequently needed repositories
 * for entities other than the entity in a given module in those modules.
 * This way, you don't need to import external entities for `TypeOrmModule.forFeature`
 * and provide those entities' repositories in those modules.
 * 
 * NOTE: In conjunction with this module, you would also need to import entities
 * in the `TypeOrmModule.forRootAsync`'s factory as follows:
 * ```
 * entities: [
 *     Apple,
 *     Orange
 * ]
 * ```
 * rather than using `autoLoadEntities: true` in and `TypeOrmModule.forFeature` in entity modules.
 */
@Global()
@Module({
    providers: [
        // AppleRepository,
        // OrangeRepository
    ],
    exports: [
        // AppleRepository,
        // OrangeRepository
    ]
})
export class DomainModule {}
