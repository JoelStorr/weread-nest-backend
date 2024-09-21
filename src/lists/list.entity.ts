import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: true})
  privateList: boolean;

  @ManyToOne(()=>User, (user)=>user.lists)
  user: User;
}