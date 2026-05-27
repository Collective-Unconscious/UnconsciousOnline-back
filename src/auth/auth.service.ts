import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      saltRounds,
    );

    const user = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
    });

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken,
    };
  }

  async loginWithDiscord(discordId: string, email: string, name: string, avatarUrl?: string) {
    let user = await this.usersService.findByDiscordId(discordId);

    if (!user) {
      user = await this.usersService.findByEmail(email);

      if (user) {
        await this.usersService.update(user.id, { discordId, avatarUrl });
        user.discordId = discordId;
        user.avatarUrl = avatarUrl || user.avatarUrl;
      } else {
        user = await this.usersService.create({
          email,
          name,
          discordId,
          avatarUrl,
        });
      }
    } else if (avatarUrl && user.avatarUrl !== avatarUrl) {
      await this.usersService.update(user.id, { avatarUrl });
      user.avatarUrl = avatarUrl;
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      accessToken,
    };
  }
}
