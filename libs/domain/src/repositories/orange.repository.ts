// import { Orange } from "@app/domain/entities";
// import { Injectable } from "@nestjs/common";
// import { InjectConnection } from "@nestjs/typeorm";
// import { Connection } from "typeorm";
// import { LinqRepository } from "typeorm-linq-repository";

// @Injectable()
// export class OrangeRepository extends LinqRepository<Orange> {
//     // NOTE: @InjectConnection is required to force Nest to wait for the TypeORM connection to be established
//     // before typeorm-linq-repository's LinqRepository attempts to get the repository from the connection.
//     public constructor(
//         @InjectConnection()
//         // eslint-disable-next-line indent
//         connection: Connection
//     ) {
//         super(Orange, { connectionName: connection.name });
//     }
// }
