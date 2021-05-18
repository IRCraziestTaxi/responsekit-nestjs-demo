import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Orange } from "src/orange/orange.entity";
import { Mapper } from "ts-simple-automapper";
import { LinqRepository } from "typeorm-linq-repository";
import { AddOrangeCommand } from "./add-orange.command";

@CommandHandler(AddOrangeCommand)
export class AddOrangeHandler implements ICommandHandler<AddOrangeCommand> {
    public async execute(command: AddOrangeCommand): Promise<CommandResult<string>> {
        try {
            if (command.weight > 10) {
                throw Rejection.BadRequest("This orange is too big!");
            }

            const mapper = new Mapper();
            const addOrange = mapper.map(command, new Orange());

            const orangeRepository = new LinqRepository(Orange);
            const addedOrange = await orangeRepository.create(addOrange);

            return new GenericResponse({
                value: `This orange weighs ${addedOrange.weight} pounds and has an ID of ${addedOrange.id}.`
            });
        }
        catch (error) {
            return new Rejection(error);
        }
    }
}
