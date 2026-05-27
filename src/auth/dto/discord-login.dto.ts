import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DiscordLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
