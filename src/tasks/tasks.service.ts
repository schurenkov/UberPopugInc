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
    const createdTask = new this.taskModel(createCatDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.aggregate
    ([
      {
        $lookup: {
          from: "users",
          localField: "assigneeId",
          foreignField: "_id",
          as: "user"
        },
      },
    ]);
  }

  async randomUser() {
    const count = await this.userModel.count();
    const skip = Math.floor(Math.random() * count);
    return await this.userModel.findOne({}).skip(skip).exec();
  }

  async update() {

    const allTasks = await this.taskModel.find({}).exec()

    const results = await Promise.all(
      allTasks.map(async (a) => ({
        updateOne: {
          "filter": { _id: a._id },
          "update": { '$set': { 'assigneeId': await this.randomUser()} }
        }
      }))
    )

    await this.taskModel.bulkWrite(results)

  }
}

