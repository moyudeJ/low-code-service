import { Module } from '@nestjs/common';
import { DatabaseModule } from '@comm/comm/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
})
export class UserModule {}
