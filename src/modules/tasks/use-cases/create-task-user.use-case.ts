import { Injectable, Logger } from '@nestjs/common';
import { TaskUserRequestDTO } from '../dto/task-user.dto';
import { ITaskUserRepository } from '../repositories/task-user.repository';

@Injectable()
export class CreateTaskUserUseCase {
  private readonly logger = new Logger(CreateTaskUserUseCase.name);

  constructor(private taskUserRepository: ITaskUserRepository) {}

  async execute(data: TaskUserRequestDTO) {
    this.logger.log('Saving task user...', { ...data });
    return this.taskUserRepository.save(data);
  }
}
