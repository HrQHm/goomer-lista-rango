import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "../../../products/infra/typeorm/entities/Product";
import { v4 as uuidv4 } from 'uuid';

@Entity("promotions_products")
class Promotion {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  promotion_price: number;

  @Column()
  day_promotion: number;

  @Column()
  promotion_start_time: string;

  @Column()
  promotion_end_time: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "id_product" })
  product: Product;

  @Column()
  id_product: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }


};

export { Promotion }