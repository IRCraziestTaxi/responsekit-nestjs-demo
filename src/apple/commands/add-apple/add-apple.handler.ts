import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Apple } from "src/apple/apple.entity";
import { Mapper } from "ts-simple-automapper";
import { LinqRepository } from "typeorm-linq-repository";
import { AddAppleCommand } from "./add-apple.command";

@CommandHandler(AddAppleCommand)
export class AddAppleHandler implements ICommandHandler<AddAppleCommand> {
    public async execute(command: AddAppleCommand): Promise<CommandResult<string>> {
        try {
            if (command.weight > 10) {
                throw Rejection.BadRequest("This apple is too big!");
            }

            const mapper = new Mapper();
            const addApple = mapper.map(command, new Apple());

            const appleRepository = new LinqRepository(Apple);
            const addedApple = await appleRepository.create(addApple);

            return new GenericResponse({
                value: `This apple weighs ${addedApple.weight} pounds and has an ID of ${addedApple.id}.`
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
