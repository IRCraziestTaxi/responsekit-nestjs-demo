import { Body, Controller, Post, Res } from "@nestjs/common";
import { CommandResultController } from "@responsekit/express";
import { CommandResultService } from "@responsekit/nestjs";
import { Response } from "express";
import { AddAppleCommand } from "./commands/add-apple/add-apple.command";

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
}
