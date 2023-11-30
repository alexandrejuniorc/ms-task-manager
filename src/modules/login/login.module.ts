import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';

import { SignInUseCase } from './use-cases/sign-in.use-case';
import { JwtModule } from '@nestjs/jwt';
import { IUserRepository } from '../users/repositories/user.repository';
import { UserPrismaRepository } from '../users/prisma/user.prisma.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'NESTJS_API',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    SignInUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class LoginModule {}
