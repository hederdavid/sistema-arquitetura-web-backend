import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './plugins/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ClientsModule, DatabaseModule, ConfigModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
