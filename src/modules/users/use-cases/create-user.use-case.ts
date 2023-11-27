import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { CreateUserDTO } from '../dto/user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreateUserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email,
        name: data.name,
      },
    });
  }
}
