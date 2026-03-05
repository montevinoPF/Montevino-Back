import { Category } from 'src/modules/categories/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'platos' })

export class Platos {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
        type: "varchar",
        length: 50,
        unique: true,
    })
    name: string;

  @Column({
        type: "text",
        nullable: false,
    })
    description: string;

  @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

 @Column({
        type: "int",
        nullable: false,
    })
    stock: number;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => Category, (category) => category.platos)
    @JoinColumn({ name: 'category_id' })
    category: Category;

}