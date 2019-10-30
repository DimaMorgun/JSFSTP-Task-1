import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 100 })
    name: string;
    @Column('int')
    price: number;
    @Column({ length: 50 })
    type: string;
    @Column()
    createdDate: Date;
    @Column()
    updatedDate: Date;
    @Column()
    isDeleted: boolean;
}
