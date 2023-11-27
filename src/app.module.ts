import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [ProductModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
