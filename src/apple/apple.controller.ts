import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GenericResponse } from "@responsekit/core";
import { CommandResultService } from "@responsekit/nestjs";
import { Apple } from "./apple.entity";
import { AddAppleCommand } from "./commands/add-apple/add-apple.command";
import { GetApplesQuery } from "./queries/get-apples/get-apples.query";

@Controller("apples")
export class AppleController {
    public constructor(private readonly _service: CommandResultService) { }

    @Post()
    public async addApple(
        @Body() command: AddAppleCommand
    ): Promise<GenericResponse<string>> {
        const addResult = await this._service.send(command);

        return addResult as GenericResponse<string>;
    }

    @Get()
    public async getApples(
        @Query() query: GetApplesQuery
    ): Promise<GenericResponse<Apple[]>> {
        const getResult = await this._service.query(query);

        return getResult as GenericResponse<Apple[]>;
    }
}
