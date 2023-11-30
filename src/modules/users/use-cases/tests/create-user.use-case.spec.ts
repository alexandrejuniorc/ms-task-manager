import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.use-case';
import { CreateUserDTO } from '../../dto/user.dto';
import { IUserRepository } from '../../repositories/user.repository';
import { UserInMemoryRepository } from '../../repositories/in-memory/user.in-memory.repository';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
          useValue: {
            findByUsernameOrEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be able to create a new user', async () => {
    const data: CreateUserDTO = {
      username: 'valid_username',
      password: 'valid_password',
      email: 'valid_email',
      name: 'valid_name',
    };

    const result = await createUserUseCase.execute(data);
    expect(result).toHaveProperty('id');
  });

  it('should not be able to create a user with an existing username', async () => {
    const data: CreateUserDTO = {
      username: 'valid_username',
      password: 'valid_password',
      email: 'valid_email',
      name: 'valid_name',
    };

    await createUserUseCase.execute(data);
    expect(createUserUseCase.execute(data)).rejects.toThrow();
  });
});
