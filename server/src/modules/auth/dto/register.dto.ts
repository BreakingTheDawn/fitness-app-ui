import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

// 注册DTO
export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: '昵称不能为空' })
  @MaxLength(50, { message: '昵称最多50个字符' })
  nickname: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: '头像URL最多255个字符' })
  avatar?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}
