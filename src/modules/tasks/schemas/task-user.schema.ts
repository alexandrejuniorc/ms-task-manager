import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskUserSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'in-progress', 'done']),
  startsAt: z.string().transform((date) => new Date(date)),
  endsAt: z.string().transform((date) => new Date(date)),
});

export class CreateTaskUserSchemaDTO extends createZodDto(
  CreateTaskUserSchema,
) {}
