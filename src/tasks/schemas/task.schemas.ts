import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from "mongoose";
import {User} from "../../users/schemas/user.schemas";

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    description: string;

    @Prop({default: 'open'})
    status: 'open' | 'done';

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    assigneeId: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);