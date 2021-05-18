import { Exclude, Expose } from "class-transformer";
import { IsOptional } from "class-validator";

@Exclude()
export class GetOrangesQuery {
    @Expose()
    @IsOptional()
    public skip = 0;

    @Expose()
    @IsOptional()
    public take = 100;
}
