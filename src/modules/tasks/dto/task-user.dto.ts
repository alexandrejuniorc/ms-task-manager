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
// export type TaskUserResponseDTO = { id: string } & TaskUserRequestDTO;
