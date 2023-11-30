import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './prisma/user.prisma.repository';
import { ProfileUserUseCase } from './use-cases/profile-user.use-case';
import { UploadAvatarUserUseCase } from './use-cases/upload-avatar-user.use-case';
import { IStorage } from 'src/infrastructure/providers/storage/storage';
import { SupabaseStorage } from 'src/infrastructure/providers/storage/supabase.storage';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ProfileUserUseCase,
    UploadAvatarUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class UserModule {}
