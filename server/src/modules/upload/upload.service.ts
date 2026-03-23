import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadFolder, UploadResponseDto } from './upload.dto';

// 允许的文件MIME类型
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// 最大文件大小 (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

@Injectable()
export class UploadService {
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    // 获取上传目录配置，默认为 './uploads'
    this.uploadDir =
      this.configService.get<string>('UPLOAD_DIR') || './uploads';
    this.ensureUploadDir();
  }

  // 确保上传目录存在
  private ensureUploadDir(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // 上传单个文件
  async uploadFile(
    file: Express.Multer.File,
    folder: UploadFolder = 'common',
  ): Promise<UploadResponseDto> {
    // 验证文件是否存在
    if (!file) {
      throw new BadRequestException('请选择要上传的文件');
    }

    // 验证文件类型
    if (!ALLOWED_MIMES.includes(file.mimetype)) {
      throw new BadRequestException(
        `不支持的文件类型: ${file.mimetype}，仅支持 JPG、PNG、GIF、WEBP 格式`,
      );
    }

    // 验证文件大小
    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('文件大小不能超过 5MB');
    }

    // 生成唯一文件名
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `${uuidv4()}${ext}`;

    // 创建文件夹路径
    const folderPath = path.join(this.uploadDir, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // 保存文件
    const filePath = path.join(folderPath, filename);
    fs.writeFileSync(filePath, file.buffer);

    // 返回访问URL
    const url = `/uploads/${folder}/${filename}`;

    return {
      url,
      filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  // 批量上传文件
  async uploadFiles(
    files: Express.Multer.File[],
    folder: UploadFolder = 'common',
  ): Promise<UploadResponseDto[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('请选择要上传的文件');
    }

    // 限制批量上传数量
    if (files.length > 9) {
      throw new BadRequestException('一次最多上传9张图片');
    }

    return Promise.all(files.map((file) => this.uploadFile(file, folder)));
  }

  // 删除文件
  async deleteFile(fileUrl: string): Promise<void> {
    // 从URL中提取相对路径
    const relativePath = fileUrl.replace('/uploads/', '');
    const filePath = path.join(this.uploadDir, relativePath);

    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('文件不存在');
    }

    // 删除文件
    fs.unlinkSync(filePath);
  }

  // 获取文件信息
  getFileInfo(fileUrl: string): { exists: boolean; path: string } {
    const relativePath = fileUrl.replace('/uploads/', '');
    const filePath = path.join(this.uploadDir, relativePath);

    return {
      exists: fs.existsSync(filePath),
      path: filePath,
    };
  }
}
