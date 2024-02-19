import { Essay } from 'src/essays/entities/essay.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('board')
export class Board {
    @PrimaryGeneratedColumn()
      uid: number;

    @Column()
      name: string;

    @Column()
      describe: string;

    @CreateDateColumn()
      createdAt: Date;

    @UpdateDateColumn()
      modifedAt: Date;

    @OneToMany(
      () => Essay,
      essay => essay.board
    )
      essays: Essay[];
}