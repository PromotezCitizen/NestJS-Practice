import { Board } from "src/boards/entities/board.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, MongoBatchReExecutionError, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('essay')
export class Essay {
    @PrimaryGeneratedColumn()
    uid: number;
    
    @Column()
    title: string;

    @Column({ 
        length: 1000
     })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 0 })
    likeCount: number;

    // 혹시 모를 조회수 로직 대비
    @Column({ default: 0 })
    viewCount: number;

    @ManyToOne(
        () => User,
        user => user.essays
    )
    owner: User;

    @ManyToOne(
        () => Board,
        board => board.essays
    )
    board: Board;

    @OneToMany(
        () => Comment,
        comment => comment.essay
    )
    comments: Comment[]
}