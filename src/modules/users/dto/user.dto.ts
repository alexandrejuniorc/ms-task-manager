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
