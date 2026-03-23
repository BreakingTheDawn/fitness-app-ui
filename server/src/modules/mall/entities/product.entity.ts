import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';

// 商品分类枚举
export enum ProductCategory {
  PRIVATE = 'private',
  EQUIPMENT = 'equipment',
  NUTRITION = 'nutrition',
  APPAREL = 'apparel',
}

// 商品实体
@Entity('products')
export class Product extends BaseEntity {
  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: ProductCategory.EQUIPMENT,
  })
  category: ProductCategory;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    name: 'original_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  originalPrice: number;

  @Column({ type: 'simple-json', nullable: true })
  images: string[];

  @Column({ default: 0 })
  sales: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'simple-json', nullable: true })
  specifications: string;

  @Column({ name: 'coach_id', nullable: true })
  coachId: number;
}
