import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { AddOrangeCommand } from "./add-orange.command";

@CommandHandler(AddOrangeCommand)
export class AddOrangeHandler implements ICommandHandler<AddOrangeCommand> {
    public async execute(command: AddOrangeCommand): Promise<CommandResult<string>> {
        if (command.weight > 10) {
            throw Rejection.BadRequest("This orange is too big!");
        }

        return new GenericResponse({
            value: `This orange weighs ${command.weight} pounds.`
        });
    }
}
