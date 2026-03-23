import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MallService } from './mall.service';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './dto';
import { Public } from '../../common/decorators';
import { ProductCategory } from './entities/product.entity';

@ApiTags('商城')
@Controller('mall')
export class MallController {
  constructor(private readonly mallService: MallService) {}

  // 创建商品（管理员）
  @Post('product')
  @ApiBearerAuth()
  @ApiOperation({ summary: '创建商品' })
  async create(@Body() createDto: CreateProductDto) {
    return this.mallService.create(createDto);
  }

  // 获取商品列表
  @Public()
  @Get('products')
  @ApiOperation({ summary: '获取商品列表' })
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query() query: QueryProductDto,
  ) {
    return this.mallService.findAll(
      parseInt(page, 10),
      parseInt(limit, 10),
      query,
    );
  }

  // 获取热门商品
  @Public()
  @Get('hot')
  @ApiOperation({ summary: '获取热门商品' })
  async getHot(@Query('limit') limit: string = '10') {
    return this.mallService.getHot(parseInt(limit, 10));
  }

  // 获取分类商品
  @Public()
  @Get('category/:category')
  @ApiOperation({ summary: '获取分类商品' })
  async getByCategory(
    @Param('category') category: ProductCategory,
    @Query('limit') limit: string = '10',
  ) {
    return this.mallService.getByCategory(category, parseInt(limit, 10));
  }

  // 获取商品详情
  @Public()
  @Get('product/:id')
  @ApiOperation({ summary: '获取商品详情' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mallService.findOne(id);
  }

  // 更新商品
  @Put('product/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '更新商品' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductDto,
  ) {
    return this.mallService.update(id, updateDto);
  }

  // 删除商品
  @Delete('product/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除商品' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.mallService.remove(id);
    return { message: '删除成功' };
  }
}
