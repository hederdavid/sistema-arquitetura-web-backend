import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './plugins/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ClientsModule, DatabaseModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
