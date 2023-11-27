import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './prisma/user.prisma.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
