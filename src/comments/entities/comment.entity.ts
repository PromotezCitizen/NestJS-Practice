import { Essay } from 'src/essays/entities/essay.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('comment')
export class Comment {
    @PrimaryGeneratedColumn()
      cid: number;

    @Column({default: ''})
      content: string;
    
    @CreateDateColumn()
      createdAt: Date;

    @UpdateDateColumn()
      updatedAt: Date;

    @ManyToOne(
      () => Essay,
      essay => essay.comments
    )
      essay: Essay;

    @ManyToOne(
      () => User,
      user => user.comments
    )
      owner: User;
}
