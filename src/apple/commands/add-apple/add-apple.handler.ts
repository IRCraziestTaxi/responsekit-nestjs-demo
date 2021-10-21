import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Mapper } from "ts-simple-automapper";
import { Apple } from "../../apple.entity";
import { AppleRepository } from "../../apple.repository";
import { AddAppleCommand } from "./add-apple.command";

@CommandHandler(AddAppleCommand)
export class AddAppleHandler implements ICommandHandler<AddAppleCommand> {
    public constructor(private readonly _appleRepository: AppleRepository) { }

    public async execute(command: AddAppleCommand): Promise<CommandResult<string>> {
        if (command.weight > 10) {
            throw Rejection.BadRequest("This apple is too big!");
        }

        const mapper = new Mapper();
        const addApple = mapper.map(command, new Apple());

        const addedApple = await this._appleRepository.create(addApple);

        return new GenericResponse({
            value: `This apple weighs ${addedApple.weight} pounds and has an ID of ${addedApple.id}.`
        });
    }
}
