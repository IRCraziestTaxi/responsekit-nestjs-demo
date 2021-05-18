import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { LinqRepository } from "typeorm-linq-repository";
import { Orange } from "../../orange.entity";
import { GetOrangesQuery } from "./get-oranges.query";

@QueryHandler(GetOrangesQuery)
export class GetOrangesHandler implements IQueryHandler<GetOrangesQuery> {
    // public constructor(
    //     @Inject(Orange)
    //     private readonly _orangeRepository: LinqRepository<Orange>
    // ) {
    // }

    public async execute(query: GetOrangesQuery): Promise<CommandResult<Orange[]>> {
        try {
            const orangeRepository = new LinqRepository(Orange);
            // const orangesQuery = this._orangeRepository.getAll();
            const orangesQuery = orangeRepository.getAll();

            const count = await orangesQuery.count();

            const oranges = await orangesQuery
                .skip(query.skip)
                .take(query.take);

            return new GenericResponse({
                count,
                value: oranges
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
