import mongoose from "mongoose";

export class CreateTaskDto {
    description: string;
    assigneeId: mongoose.Schema.Types.ObjectId
}