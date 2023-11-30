export type TaskUserRequestDTO = {
  userId: string;
  title: string;
  description: string;
  startsAt: Date;
  endsAt: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'done';
};

export type TaskUserResponseDTO = { id: string };

type TaskDTO = {
  startsAt: Date;
  endsAt: Date;
  title: string;
  description: string;
};

type UserDTO = {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
};

export type TaskUserNotificationDTO = {
  id: string;
  taskId: string;
  userId: string;
  createdAt: Date;
  task: TaskDTO;
  user: UserDTO;
};
