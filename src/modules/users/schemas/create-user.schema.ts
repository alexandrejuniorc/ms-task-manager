import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserSchema = z.object({
  name: z.string({
    required_error: 'name is required',
  }),
  username: z.string({
    required_error: 'username is required',
  }),
  password: z.string({
    required_error: 'password is required',
  }),
  email: z.string().email(),
});

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) {}

export const CreateUserResponseSchemaDTO = CreateUserSchema.omit({
  password: true,
});
export type CreateUserResponseSchemaDTO = z.infer<
  typeof CreateUserResponseSchemaDTO
>;
