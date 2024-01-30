import { Board } from "src/boards/entities/board.entity";
import { Essay } from "src/essays/entities/essay.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'user'}) // 테이블의 기본 이름 설정
export class User {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    id: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({default: 'default'})
    nickname: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(
        () =>  Board,
        board => board.owner
    )
    boards: Board[];

    @OneToMany(
        () => Essay,
        essay => essay
    )
    essays: Essay[];
}
