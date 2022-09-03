import { v4 as uuidV4 } from 'uuid';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from '../../../../products/infra/typeorm/entities/Product';

@Entity("restaurants")
class Restaurant {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  image_restaurant: string;

  @Column()
  address: string;

  @ManyToMany(() => Product)
  @JoinTable({
    name: "products_restaurants",
    joinColumns: [{ name: "restaurant_id" }],
    inverseJoinColumns: [{ name: "product_id" }]
  })
  products: Product[];

  @Column()
  weekDayOpen: number;

  @Column()
  weekDayClose: number;

  @Column()
  opening_time_week: string;

  @Column()
  closing_time_week: string;

  @Column()
  weekendOpen: number;

  @Column()
  weekendClose: number;

  @Column()
  opening_time_weekend: string;

  @Column()
  closing_time_weekend: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
};

export { Restaurant };