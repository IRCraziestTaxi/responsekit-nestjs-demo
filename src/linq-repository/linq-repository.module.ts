// This was a fantastical failure.
// useFactory is apparently executed immediately on startup,
// not as services are injected/used at runtime,
// so it results in a connection not found error.
// Can we revisit it, perhaps? I'm not optimistic about it.

// The plan for usage was:

// To inject LinqRepository for any entity in any service throughout the app:

// In app.module.ts:
// LinqRepositoryModule.forRoot([Apple, Orange])

// In a service:
// public constructor(@Inject(Apple) private readonly _appleRepository: LinqRepository<Apple>) {}

// To scope injection of LinqRepository by entity in each module:

// In (for example) apple.module.ts:
// LinqRepositoryModule.forFeature([Apple])

// In a service in apple module:
// public constructor(@Inject(Apple) private readonly _appleRepository: LinqRepository<Apple>) {}

// But alas. It seems we cannot await creation of the TypeORM connection in an async factory.
// I looked EVERYWHERE for that option.
// In fact, even a super messy workaround of a while loop checking for connections via connection manager
// did not work for some reason. I have no idea wtf is happening in the background there.

// It seems in order to use LinqRepository in a nest app, you must simply use new LinqRepository() in service methods.

// import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
// import { EntitySchema } from "typeorm";
// import { LinqRepository } from "typeorm-linq-repository";

// type EntitySchemaMapping<T> = [string, EntitySchema<T>];
// type EntityClass<T> = { new (...args: any[]): T; };

// const linqRepositoryFactory = <T>(entity: EntitySchemaMapping<T> | EntityClass<T>): Provider => ({
//     provide: entity instanceof Array ? entity[0] : entity,
//     useFactory: () => entity instanceof Array ? new LinqRepository(entity[1]) : new LinqRepository(entity)
// });

// // @Global()
// // @Module({})
// // class LinqRepositoryGlobalModule {}

// // @Module({})
// // class LinqRepositoryFeatureModule {}

// @Global()
// @Module({})
// export class LinqRepositoryModule {
//     // public static forFeature(
//     //     entities: (EntitySchemaMapping<unknown> | EntityClass<unknown>)[],
//     //     typeormFeatureModule: DynamicModule,
//     // ): DynamicModule {
//     //     const providers = entities.map(e => linqRepositoryFactory(e));

//     //     return {
//     //         imports: [typeormFeatureModule],
//     //         providers,
//     //         // exports: [...providers, typeormFeatureModule],
//     //         exports: providers,
//     //         // module: LinqRepositoryFeatureModule
//     //         module: LinqRepositoryModule
//     //     };
//     // }

//     public static async forRootAsync(
//         entities: (EntitySchemaMapping<unknown> | EntityClass<unknown>)[],
//         typeormRootModule: DynamicModule
//     ): Promise<DynamicModule> {
//         const providers = entities.map(e => linqRepositoryFactory(e));

//         return {
//             imports: [typeormRootModule],
//             providers,
//             // exports: providers,
//             exports: [...providers, typeormRootModule],
//             module: LinqRepositoryModule
//         };
//     }
// }
