import { List } from "src/lists/list.entity";
import { AfterInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({nullable: true})
  name!: string;

  @OneToMany(()=>List, (list)=>list.user)
  lists: List[];


  @AfterInsert()
  afterInser(){
    //TODO: Creates bas list for the user
    // TODO: Creates statistic entry for the user
  }


}