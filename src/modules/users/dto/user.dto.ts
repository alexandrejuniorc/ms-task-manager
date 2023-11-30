export type CreateUserDTO = {
  username: string;
  password: string;
  email: string;
  name: string;
};
export type OutputUserDTO = {
  id: string;
  createdAt: Date;
} & CreateUserDTO;

export type FindByUsernameOrEmailDTO = {
  username: string;
  email: string;
};

export type FileDTO = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type AvatarDTO = {
  userId: string;
  file: FileDTO;
};
