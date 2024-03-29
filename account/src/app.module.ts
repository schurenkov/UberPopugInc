import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {AppController} from "./app.contoller";

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}