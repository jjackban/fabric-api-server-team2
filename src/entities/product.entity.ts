import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn  } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    seller: string;

    @Column()
    styleNum: string;

    @Column()
    brand: string;

    @Column()
    image: string;

    @Column()
    inventory: string;
  
    @Column()
    price: number;
  
    @CreateDateColumn()
    createdAt: Date;
}