import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";
import { CommandResultService } from "@responsekit/nestjs";
import { Response } from "express";
import { AddAppleCommand } from "./commands/add-apple/add-apple.command";
import { GetApplesQuery } from "./queries/get-apples/get-apples.query";

@Controller("apples")
export class AppleController extends CommandResultController {
    public constructor(private readonly _service: CommandResultService) {
        super();
    }

    @Post()
    public async addApple(
        @Body()
            command: AddAppleCommand,
        @Res()
            response: Response
    ): Promise<Response> {
        const addResult = await this._service.send(command);

        return this.sendResponse(addResult, response);
    }

    @Get()
    public async getApples(
        @Query()
            query: GetApplesQuery,
        @Res()
            response: Response
    ): Promise<Response> {
        const getResult = await this._service.query(query);

        return this.sendResponse(getResult, response);
    }
}
