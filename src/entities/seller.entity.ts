import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity({ name: 'sellers' })
export class Sellers {
    @PrimaryColumn('varchar', {name:'id', unique:true})
    id: string;
  
    @Column('varchar',{name:'password', length:70})
    password: string;

    @Column('varchar',{name:'name', length:20})
    name: string;

}