import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, ProductCategory } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto';

@Injectable()
export class MallService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // 创建商品
  async create(createDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createDto);
    return this.productRepository.save(product);
  }

  // 获取商品详情
  async findOne(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('商品不存在');
    }

    return product;
  }

  // 获取商品列表
  async findAll(
    page: number = 1,
    limit: number = 10,
    query?: QueryProductDto,
  ): Promise<[Product[], number]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .where('product.isActive = :isActive', { isActive: true });

    // 分类筛选
    if (query?.category) {
      queryBuilder.andWhere('product.category = :category', {
        category: query.category,
      });
    }

    // 关键词搜索
    if (query?.keyword) {
      queryBuilder.andWhere(
        '(product.title LIKE :keyword OR product.description LIKE :keyword)',
        { keyword: `%${query.keyword}%` },
      );
    }

    // 价格区间筛选
    if (query?.minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: query.minPrice,
      });
    }
    if (query?.maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    queryBuilder
      .orderBy('product.sales', 'DESC')
      .addOrderBy('product.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 更新商品
  async update(
    id: number,
    updateDto: UpdateProductDto,
  ): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('商品不存在');
    }

    Object.assign(product, updateDto);
    return this.productRepository.save(product);
  }

  // 删除商品（软删除）
  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('商品不存在');
    }

    product.isActive = false;
    await this.productRepository.save(product);
  }

  // 获取热门商品
  async getHot(limit: number = 10): Promise<Product[]> {
    return this.productRepository.find({
      where: { isActive: true },
      order: { sales: 'DESC' },
      take: limit,
    });
  }

  // 获取分类商品
  async getByCategory(
    category: ProductCategory,
    limit: number = 10,
  ): Promise<Product[]> {
    return this.productRepository.find({
      where: { isActive: true, category },
      order: { sales: 'DESC' },
      take: limit,
    });
  }
}
