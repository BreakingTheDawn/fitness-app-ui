import { IsOptional, IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// 文件上传文件夹类型
export type UploadFolder = 'avatar' | 'coach' | 'course' | 'review' | 'common';

// 文件上传DTO
export class UploadFileDto {
  @ApiProperty({
    description: '上传文件夹类型',
    enum: ['avatar', 'coach', 'course', 'review', 'common'],
    default: 'common',
    required: false,
  })
  @IsOptional()
  @IsIn(['avatar', 'coach', 'course', 'review', 'common'])
  folder?: UploadFolder;
}

// 文件上传响应DTO
export class UploadResponseDto {
  @ApiProperty({ description: '文件访问URL' })
  url: string;

  @ApiProperty({ description: '文件名' })
  filename: string;

  @ApiProperty({ description: '文件大小(字节)' })
  size: number;

  @ApiProperty({ description: '文件MIME类型' })
  mimetype: string;
}

// 删除文件DTO
export class DeleteFileDto {
  @ApiProperty({ description: '文件URL' })
  @IsString()
  url: string;
}
