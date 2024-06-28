import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn  } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    styleNum: string;

    @Column()
    brand: string;

    @Column()
    inventory: number;
  
    @Column()
    price: number;
  
    @CreateDateColumn()
    createdAt: Date;
}