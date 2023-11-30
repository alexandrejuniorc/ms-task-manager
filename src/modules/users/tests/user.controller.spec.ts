import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { CreateUserSchemaDTO } from '../schemas/create-user.schema';
import { IUserRepository } from '../repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ProfileUserUseCase } from '../use-cases/profile-user.use-case';
import { UploadAvatarUserUseCase } from '../use-cases/upload-avatar-user.use-case';
import { IStorage } from '../../../infrastructure/providers/storage/storage';
import { randomUUID } from 'crypto';

describe('UserController', () => {
  let userController: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        ProfileUserUseCase,
        UploadAvatarUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByUsernameOrEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: IStorage,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('should be able to create a new user', async () => {
    const data: CreateUserSchemaDTO = {
      username: 'valid_username',
      password: 'valid_password',
      email: 'valid_email@email.com',
      name: 'valid_name',
    };

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    });

    const result = await userController.create(data);
    expect(result).toHaveProperty('username');
  });
});
