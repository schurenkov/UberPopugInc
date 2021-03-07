import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Task, TaskDocument} from "./schemas/task.schemas";
import {Model} from "mongoose";
import {CreateTaskDto} from "./dto/create-task.dto";
import {User, UserDocument} from "../users/schemas/user.schemas";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createCatDto: CreateTaskDto): Promise<Task> {
    const total = await this.userModel.countDocuments();
    const skip = Math.floor(Math.random() * total) + 1;
    const random = await this.userModel.findOne({}).skip(skip).exec();

    const createdTask = new this.taskModel({...createCatDto, assigneeId: random._id});
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.aggregate([
      {$set: {assigneeId: {$toObjectId: "$assigneeId"} }},
      {
        $lookup: {
          from: "User",
          localField: "assigneeId",
          foreignField: "_id",
          as: "user"
        },
      }
    ]);
    return tasks
  }
}

