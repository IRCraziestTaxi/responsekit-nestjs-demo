import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GenericResponse } from "@responsekit/core";
import { CommandResultService } from "@responsekit/nestjs";
import { AddOrangeCommand } from "./commands/add-orange/add-orange.command";
import { Orange } from "./orange.entity";
import { GetOrangesQuery } from "./queries/get-oranges/get-oranges.query";

@Controller("oranges")
export class OrangeController {
    public constructor(private readonly _service: CommandResultService) { }

    @Post()
    public async addOrange(
        @Body() command: AddOrangeCommand
    ): Promise<GenericResponse<string>> {
        const addResult = await this._service.send(command);

        return addResult as GenericResponse<string>;
    }

    @Get()
    public async getOranges(
        @Query() query: GetOrangesQuery
    ): Promise<GenericResponse<Orange[]>> {
        const getResult = await this._service.query(query);

        return getResult as GenericResponse<Orange[]>;
    }
}
