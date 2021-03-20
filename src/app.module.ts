import { Module } from '@nestjs/common';
import {TasksModule} from "./tasks/tasks.module";
import { MongooseModule } from '@nestjs/mongoose';
import {AppController} from "./app.controller";
import {UsersModule} from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TasksModule,
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}
