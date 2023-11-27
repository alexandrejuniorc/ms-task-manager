import { Controller, Get, Param, Query } from '@nestjs/common';

type ParamsUser = {
  id: string;
  enterpriseId: string;
};

type QueryUser = {
  firstName: string;
  lastName: string;
};

@Controller()
export class UserController {
  @Get('users/:id/:enterpriseId')
  findById(@Param() params: ParamsUser) {
    return `User ID: ${params.id} - Enterprise ID: ${params.enterpriseId}`;
  }

  @Get('users/:id')
  findByPages(@Query() queries: QueryUser) {
    return 'Queries' + JSON.stringify(queries);
  }
}
