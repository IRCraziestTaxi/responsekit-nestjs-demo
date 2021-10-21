# responsekit-nestjs-demo
Demonstration of using `@responsekit/nestjs` in a nestjs application.

After creating your nest project, install the following packages:

```
npm i @responsekit/core @responsekit/nestjs
```

In order to use `CommandResultService`, `@nestjs/cqrs` must also be installed.

## Demonstrations
This project demonstrates the usage of `@responsekit/core` and `@responsekit/nestjs` in a NestJS application as well as injectable repositories extending `typeorm-linq-repository`'s `LinqRepository`.

Note that the working approach is using repositories local to each entity's module along with `autoLoadEntities: true` in the TypeORM connection factory and `TypeOrmModule.forFeature` in each entity's module alongside the repository being provided in the `providers` array of the entity's module.

However, in an application where repositories external to an entity's module are frequently used, rather than importing external entities into an entity's module, including those entities in `TypeOrmModule.forFeature` for that entity's module, and providing those entities' repositories in the `providers` array for that entity's module, you can also use the approach demonstrated by the `DomainModule`, which would provide each repository globally, removing the need for `TypeOrmModule.forFeature` and providing repositories in the `providers` array for entity modules. To use this approach, you also need to import entities in the TypeORM connection factory rather than using `autoLoadEntities: true`.

Example:

```ts
@Module({
    imports: [
        // ...
        TypeOrmModule.forRootAsync({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: "ormconfig.env"
                })
            ],
            inject: [
                ConfigService
            ],
            useFactory: async (configService: ConfigService) => ({
                // ...
                // To provide repositories globally with DomainModule,
                // provide entities globally this way rather than using
                // autoLoadEntities: true and TypeOrmModule.forFeature.
                entities: [
                    Apple,
                    Orange
                ],
                // ...
            } as TypeOrmModuleOptions)
        }),
        // ...
    ],
    controllers: [],
    providers: []
})
export class AppModule { }
```

## Migrations
Migrations are managed easily by using the following scripts in `package.json`:

```
"mig:make": "npm run typeorm:registered -- migration:generate",
"mig:revert": "npm run typeorm:registered migration:revert",
"mig:run": "npm run typeorm:registered migration:run",
"typeorm:registered": "ts-node -r tsconfig-paths/register ./node_modules/.bin/typeorm"
```

To create a migration use:

```
npm run mig:make -- -n MigrationName
```

or, for a yarn project:

```
yarn mig:make -n MigrationName
```

To run pending migrations against a database, use the `mig:run` command. To revert one migration at a time, use the `mig:revert` command.

## Original NestJS README contents

See [`@responsekit/nestjs` on github](https://github.com/IRCraziestTaxi/responsekit-nestjs) for usage instructions.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
