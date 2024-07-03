import { Entity, Column } from 'typeorm';

@Entity({ name: 'items' })
export class Items {
    @Column()
    name: string;

    @Column()
    styleNum: string;

    @Column()
    inventory: number;
}