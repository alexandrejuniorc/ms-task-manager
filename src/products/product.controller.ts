import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductController {
  @Get('/create')
  createProduct() {
    return 'Produto criado';
  }
}
