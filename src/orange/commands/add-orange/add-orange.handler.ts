import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Mapper } from "ts-simple-automapper";
import { Orange } from "../../orange.entity";
import { OrangeRepository } from "../../orange.repository";
import { AddOrangeCommand } from "./add-orange.command";

@CommandHandler(AddOrangeCommand)
export class AddOrangeHandler implements ICommandHandler<AddOrangeCommand> {
    public constructor(private readonly _orangeRepository: OrangeRepository) { }

    public async execute(command: AddOrangeCommand): Promise<CommandResult<string>> {
        if (command.weight > 10) {
            throw Rejection.BadRequest("This orange is too big!");
        }

        const mapper = new Mapper();
        const addOrange = mapper.map(command, new Orange());

        const addedOrange = await this._orangeRepository.create(addOrange);

        return new GenericResponse({
            value: `This orange weighs ${addedOrange.weight} pounds and has an ID of ${addedOrange.id}.`
        });
    }
}
