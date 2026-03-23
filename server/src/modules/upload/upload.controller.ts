import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Get,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadFileDto, UploadResponseDto, DeleteFileDto } from './upload.dto';
import { Public } from '../../common/decorators';

@ApiTags('文件上传')
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 上传单张图片
  @Post('image')
  @ApiOperation({ summary: '上传单张图片' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: '上传成功',
    type: UploadResponseDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadFileDto,
  ): Promise<UploadResponseDto> {
    return this.uploadService.uploadFile(file, dto.folder);
  }

  // 批量上传图片
  @Post('images')
  @ApiOperation({ summary: '批量上传图片(最多9张)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: '上传成功',
    type: [UploadResponseDto],
  })
  @UseInterceptors(FilesInterceptor('files', 9))
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: UploadFileDto,
  ): Promise<UploadResponseDto[]> {
    return this.uploadService.uploadFiles(files, dto.folder);
  }

  // 删除文件
  @Delete('file')
  @ApiOperation({ summary: '删除文件' })
  @ApiResponse({ status: 200, description: '删除成功' })
  async deleteFile(@Body() dto: DeleteFileDto): Promise<{ success: boolean }> {
    await this.uploadService.deleteFile(dto.url);
    return { success: true };
  }

  // 获取上传目录（公开访问，用于测试）
  @Get('folders')
  @Public()
  @ApiOperation({ summary: '获取可用的上传文件夹列表' })
  getFolders(): { folders: string[] } {
    return {
      folders: ['avatar', 'coach', 'course', 'review', 'common'],
    };
  }
}
