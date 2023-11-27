import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { randomUUID } from 'crypto';

type ParamsUser = {
  id: string;
  enterpriseId: string;
};

type QueryUser = {
  firstName: string;
  lastName: string;
};

type BodyUser = {
  name: string;
  age: string;
};

@Controller()
@Controller('/users')
export class UserController {
  @Get('/:id/:enterpriseId')
  findById(@Param() params: ParamsUser) {
    return `User ID: ${params.id} - Enterprise ID: ${params.enterpriseId}`;
  }

  @Get('/:id')
  findByPages(@Query() queries: QueryUser) {
    return 'Queries' + JSON.stringify(queries);
  }

  @Post('/create')
  create(@Body() body: BodyUser) {
    return {
      id: randomUUID(),
      ...body,
    };
  }
}
