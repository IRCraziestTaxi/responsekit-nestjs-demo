import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { AddAppleCommand } from "./add-apple.command";

@CommandHandler(AddAppleCommand)
export class AddAppleHandler implements ICommandHandler<AddAppleCommand> {
    public async execute(command: AddAppleCommand): Promise<CommandResult<string>> {
        if (command.weight > 10) {
            throw Rejection.BadRequest("This apple is too big!");
        }

        return new GenericResponse({
            value: `This apple weighs ${command.weight} pounds.`
        });
    }
}
