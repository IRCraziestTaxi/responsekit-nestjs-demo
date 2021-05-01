import { Exclude, Expose } from "class-transformer";
import { IsNumber, Min } from "class-validator";

@Exclude()
export class AddAppleCommand {
    @IsNumber()
    @Min(1)
    @Expose()
    public weight: number;
}
