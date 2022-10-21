import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LinqRepository } from "typeorm-linq-repository";
import { Apple } from "./apple.entity";

@Injectable()
export class AppleRepository extends LinqRepository<Apple> {
    // NOTE: @InjectDataSource is required to force Nest to wait for the TypeORM connection to be established
    // before typeorm-linq-repository's LinqRepository attempts to get the repository from the data source.
    public constructor(
        @InjectDataSource()
        // eslint-disable-next-line indent
        dataSource: DataSource
    ) {
        super(dataSource, Apple);
    }
}
