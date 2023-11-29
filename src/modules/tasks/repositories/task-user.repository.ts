import { TaskUserResponseDTO } from '../dto/task-user.dto';

export abstract class ITaskUserRepository {
  abstract save(data: any): Promise<TaskUserResponseDTO>;
}
