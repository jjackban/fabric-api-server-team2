import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn  } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    price: number;
  
    @CreateDateColumn()
    createdAt: Date;
}