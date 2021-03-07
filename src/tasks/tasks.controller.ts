import {Body, Controller, Get, Post, Redirect, Render} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {CreateTaskDto} from "./dto/create-task.dto";

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  @Render('tasks')
  async root() {
    const tasks = await this.taskService.findAll()
    return { tasks };
  }

  @Post()
  @Redirect('/tasks')
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.taskService.create(createTaskDto);
  }

}
