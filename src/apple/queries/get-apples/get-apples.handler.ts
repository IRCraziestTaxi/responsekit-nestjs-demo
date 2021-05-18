import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { LinqRepository } from "typeorm-linq-repository";
import { Apple } from "../../apple.entity";
import { GetApplesQuery } from "./get-apples.query";

@QueryHandler(GetApplesQuery)
export class GetApplesHandler implements IQueryHandler<GetApplesQuery> {
    // public constructor(
    //     @Inject(Apple)
    //     private readonly _appleRepository: LinqRepository<Apple>
    // ) {
    // }

    public async execute(query: GetApplesQuery): Promise<CommandResult<Apple[]>> {
        try {
            const appleRepository = new LinqRepository(Apple);
            // const applesQuery = this._appleRepository.getAll();
            const applesQuery = appleRepository.getAll();

            const count = await applesQuery.count();

            const apples = await applesQuery
                .skip(query.skip)
                .take(query.take);

            return new GenericResponse({
                count,
                value: apples
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
