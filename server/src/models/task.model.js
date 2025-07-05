

import { Schema } from "mongoose";
import mongoose from "mongoose";
const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
assignedBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Admin",
  required:true
},
assignedTo:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
},
},{timestamps:true});


export const Task= mongoose.model('Task',taskSchema)