import { Ignore, MapProp } from "ts-simple-automapper";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Apple {
    @Ignore()
    @PrimaryGeneratedColumn()
    public id: number;

    @MapProp()
    @Column({ nullable: false })
    public weight: number;
}
