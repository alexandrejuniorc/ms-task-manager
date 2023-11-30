import { randomUUID } from 'crypto';
import {
  FindByUsernameOrEmailDTO,
  OutputUserDTO,
  CreateUserDTO,
} from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';

export class UserInMemoryRepository implements IUserRepository {
  users: OutputUserDTO[] = [];

  async findByUsernameOrEmail(
    data: FindByUsernameOrEmailDTO,
  ): Promise<OutputUserDTO | null> {
    const user = this.users.find(
      (user) => user.username === data.username || user.email === data.email,
    );
    return user ?? null;
  }
  async save(data: CreateUserDTO): Promise<OutputUserDTO> {
    const user: OutputUserDTO = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }
  findByUsername(username: string): Promise<OutputUserDTO | null> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<OutputUserDTO | null> {
    throw new Error('Method not implemented.');
  }
  uploadAvatar(id: string, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
