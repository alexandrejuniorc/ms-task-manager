import {
  CreateUserDTO,
  FindByUsernameOrEmailDTO,
  OutputUserDTO,
} from '../dto/user.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(
    data: FindByUsernameOrEmailDTO,
  ): Promise<OutputUserDTO | null>;
  abstract save(data: CreateUserDTO): Promise<OutputUserDTO>;
}