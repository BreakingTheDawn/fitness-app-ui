import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Coach } from '../coach/entities/coach.entity';
import { Order, OrderStatus } from '../order/entities/order.entity';
import { User } from '../user/entities/user.entity';
import { CreateReviewDto, ReplyReviewDto, QueryReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 创建评价
  async create(userId: number, createDto: CreateReviewDto): Promise<Review> {
    // 检查订单是否存在且属于当前用户
    const order = await this.orderRepository.findOne({
      where: { id: createDto.orderId, userId },
    });

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    // 检查订单是否已完成
    if (order.status !== OrderStatus.COMPLETED) {
      throw new BadRequestException('只能评价已完成的订单');
    }

    // 检查是否已评价
    const existingReview = await this.reviewRepository.findOne({
      where: { orderId: createDto.orderId },
    });

    if (existingReview) {
      throw new BadRequestException('该订单已评价');
    }

    // 检查教练是否存在
    const coach = await this.coachRepository.findOne({
      where: { id: createDto.coachId },
    });

    if (!coach) {
      throw new NotFoundException('教练不存在');
    }

    // 创建评价
    const review = this.reviewRepository.create({
      userId,
      coachId: createDto.coachId,
      orderId: createDto.orderId,
      rating: createDto.rating,
      content: createDto.content,
      images: createDto.images,
      isAnonymous: createDto.isAnonymous || false,
    });

    const savedReview = await this.reviewRepository.save(review);

    // 更新教练评分
    await this.updateCoachRating(createDto.coachId);

    return savedReview;
  }

  // 获取教练的评价列表
  async findByCoach(
    coachId: number,
    query: QueryReviewDto,
  ): Promise<[Review[], number]> {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.order', 'order')
      .where('review.coachId = :coachId', { coachId });

    // 评分筛选
    if (query.rating) {
      queryBuilder.andWhere('review.rating = :rating', {
        rating: query.rating,
      });
    }

    queryBuilder
      .orderBy('review.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [reviews, total] = await queryBuilder.getManyAndCount();

    // 处理匿名评价
    const processedReviews = reviews.map((review) => {
      if (review.isAnonymous) {
        review.user = {
          ...review.user,
          nickname: '匿名用户',
          avatar: '',
        } as User;
      }
      return review;
    });

    return [processedReviews, total];
  }

  // 获取用户的评价列表
  async findByUser(
    userId: number,
    query: QueryReviewDto,
  ): Promise<[Review[], number]> {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const queryBuilder = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.coach', 'coach')
      .leftJoinAndSelect('review.order', 'order')
      .where('review.userId = :userId', { userId });

    // 评分筛选
    if (query.rating) {
      queryBuilder.andWhere('review.rating = :rating', {
        rating: query.rating,
      });
    }

    queryBuilder
      .orderBy('review.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    return queryBuilder.getManyAndCount();
  }

  // 教练回复评价
  async reply(
    coachId: number,
    reviewId: number,
    replyDto: ReplyReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId, coachId },
    });

    if (!review) {
      throw new NotFoundException('评价不存在');
    }

    // 检查是否已回复
    if (review.coachReply) {
      throw new BadRequestException('该评价已回复');
    }

    review.coachReply = replyDto.reply;
    review.repliedAt = new Date();

    return this.reviewRepository.save(review);
  }

  // 获取评价详情
  async findOne(reviewId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
      relations: ['user', 'coach', 'order'],
    });

    if (!review) {
      throw new NotFoundException('评价不存在');
    }

    // 处理匿名评价
    if (review.isAnonymous) {
      review.user = {
        ...review.user,
        nickname: '匿名用户',
        avatar: '',
      } as User;
    }

    return review;
  }

  // 获取教练评价统计
  async getCoachReviewStats(coachId: number) {
    const reviews = await this.reviewRepository.find({
      where: { coachId },
    });

    const total = reviews.length;
    const avgRating =
      total > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

    // 各星级数量
    const ratingCounts = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    return {
      total,
      avgRating: avgRating.toFixed(1),
      ratingCounts,
    };
  }

  // 更新教练评分
  private async updateCoachRating(coachId: number): Promise<void> {
    const stats = await this.getCoachReviewStats(coachId);

    await this.coachRepository.update(coachId, {
      rating: parseFloat(stats.avgRating),
      reviewCount: stats.total,
    });
  }
}
