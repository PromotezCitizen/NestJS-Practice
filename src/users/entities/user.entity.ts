import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
