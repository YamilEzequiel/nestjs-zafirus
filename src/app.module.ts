import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './core/config/db.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { InterceptorInterceptor } from './core/interceptor/interceptor/interceptor.interceptor';

@Module({
  imports: [CategoriesModule, ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: InterceptorInterceptor,
    },
  ],
})
export class AppModule {}
