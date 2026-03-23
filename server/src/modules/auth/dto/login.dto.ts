import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

// 登录DTO
export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'openid不能为空' })
  openid: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
