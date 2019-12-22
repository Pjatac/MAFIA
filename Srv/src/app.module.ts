import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VMModule } from './vm/vm.module';

@Module({
  imports: [VMModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
