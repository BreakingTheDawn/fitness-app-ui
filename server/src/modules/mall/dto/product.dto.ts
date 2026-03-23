import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  Min,
  MaxLength,
} from 'class-validator';
import { ProductCategory } from '../entities/product.entity';

// 创建商品DTO
export class CreateProductDto {
  @IsString()
  @MaxLength(100, { message: '标题最多100个字符' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ProductCategory, { message: '商品分类无效' })
  @IsOptional()
  category?: ProductCategory;

  @IsNumber()
  @Min(0, { message: '价格不能为负数' })
  price: number;

  @IsNumber()
  @Min(0, { message: '原价不能为负数' })
  @IsOptional()
  originalPrice?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsNumber()
  @Min(0, { message: '库存不能为负数' })
  @IsOptional()
  stock?: number;
}

// 更新商品DTO
export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: '标题最多100个字符' })
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0, { message: '价格不能为负数' })
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0, { message: '原价不能为负数' })
  @IsOptional()
  originalPrice?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsNumber()
  @Min(0, { message: '库存不能为负数' })
  @IsOptional()
  stock?: number;
}

// 商品查询DTO
export class QueryProductDto {
  @IsEnum(ProductCategory)
  @IsOptional()
  category?: ProductCategory;

  @IsString()
  @IsOptional()
  keyword?: string;

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;
}
