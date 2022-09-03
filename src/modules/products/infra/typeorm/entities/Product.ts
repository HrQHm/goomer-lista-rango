import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Category } from './Category';
import { Restaurant } from '../../../../restaurants/infra/typeorm/entities/Restaurant';

@Entity("products")
class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  image_product: string;

  @Column()
  promotion: boolean;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;

  @Column()
  restaurant_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

}

export { Product }