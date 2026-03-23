import { IsString, IsOptional, MaxLength, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

// 更新用户信息DTO
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(50, { message: '昵称最多50个字符' })
  nickname?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255, { message: '头像URL最多255个字符' })
  avatar?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

// 切换角色DTO
export class SwitchRoleDto {
  @IsEnum(UserRole, { message: '角色类型无效' })
  role: UserRole;
}
