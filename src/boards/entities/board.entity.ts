import { Essay } from "src/essays/entities/essay.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("board")
export class Board {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    name: string;

    @Column()
    describe: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        () => User,
        user => user.boards
    )
    owner: User;

    @OneToMany(
        () => Essay,
        essay => essay.board
    )
    essays: Essay[];
}