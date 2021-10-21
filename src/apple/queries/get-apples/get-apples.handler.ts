import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse } from "@responsekit/core";
import { Apple } from "../../apple.entity";
import { AppleRepository } from "../../apple.repository";
import { GetApplesQuery } from "./get-apples.query";

@QueryHandler(GetApplesQuery)
export class GetApplesHandler implements IQueryHandler<GetApplesQuery> {
    public constructor(private readonly _appleRepository: AppleRepository) { }

    public async execute(query: GetApplesQuery): Promise<CommandResult<Apple[]>> {
        const applesQuery = this._appleRepository.getAll();

        const count = await applesQuery.count();

        const apples = await applesQuery
            .skip(query.skip)
            .take(query.take);

        return new GenericResponse({
            count,
            value: apples
        });
    }
}
