import { PrismaService } from 'src/infrastructure/database/prisma.service';
import {
  FindByUsernameOrEmailDTO,
  OutputUserDTO,
  CreateUserDTO,
} from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByUsernameOrEmail(
    data: FindByUsernameOrEmailDTO,
  ): Promise<OutputUserDTO> {
    return await this.prismaService.user.findFirst({
      where: { OR: [{ username: data.username }, { email: data.email }] },
    });
  }

  async save(data: CreateUserDTO): Promise<OutputUserDTO> {
    return await this.prismaService.user.create({ data });
  }

  async findByUsername(username: string): Promise<OutputUserDTO> {
    return await this.prismaService.user.findUnique({ where: { username } });
  }
}
