import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse } from "@responsekit/core";
import { Orange } from "../../orange.entity";
import { OrangeRepository } from "../../orange.repository";
import { GetOrangesQuery } from "./get-oranges.query";

@QueryHandler(GetOrangesQuery)
export class GetOrangesHandler implements IQueryHandler<GetOrangesQuery> {
    public constructor(private readonly _orangeRepository: OrangeRepository) { }

    public async execute(query: GetOrangesQuery): Promise<CommandResult<Orange[]>> {
        const orangesQuery = this._orangeRepository.getAll();

        const count = await orangesQuery.count();

        const oranges = await orangesQuery
            .skip(query.skip)
            .take(query.take);

        return new GenericResponse({
            count,
            value: oranges
        });
    }
}
