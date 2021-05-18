import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";
import { CommandResultService } from "@responsekit/nestjs";
import { Response } from "express";
import { AddOrangeCommand } from "./commands/add-orange/add-orange.command";
import { GetOrangesQuery } from "./queries/get-oranges/get-oranges.query";

@Controller("oranges")
export class OrangeController extends CommandResultController {
    public constructor(private readonly _service: CommandResultService) {
        super();
    }

    @Post()
    public async addOrange(
        @Body()
            command: AddOrangeCommand,
        @Res()
            response: Response
    ): Promise<Response> {
        const addResult = await this._service.send(command);

        return this.sendResponse(addResult, response);
    }

    @Get()
    public async getOranges(
        @Query()
            query: GetOrangesQuery,
        @Res()
            response: Response
    ): Promise<Response> {
        const getResult = await this._service.query(query);

        return this.sendResponse(getResult, response);
    }
}
