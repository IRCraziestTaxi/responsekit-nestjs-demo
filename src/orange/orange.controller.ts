import { Body, Controller, Post, Res } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";
import { CommandResultService } from "@responsekit/nestjs";
import { Response } from "express";
import { AddOrangeCommand } from "./commands/add-orange/add-orange.command";

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
}
