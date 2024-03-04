import mongoose from 'mongoose';

const taskSchema = new Schema({

    task: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, 
{
    timestamps: true
}
)


export const Task = mongoose.model("Task", taskSchema)