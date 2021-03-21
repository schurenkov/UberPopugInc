import mongoose from "mongoose";

export interface Task {
    description: string;
    assigneeId: mongoose.Schema.Types.ObjectId;
    status: 'open' | 'done';
}