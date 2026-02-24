const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        authorName: String,
        authorRole: String,
        comment: String,
        createdAt: {type: Date, Default: Date.now},
    }
);

const statusLogSchema = new mongoose.Schema({
    oldStatus:String,
    newStatus: String,
    changedBy:{
        name: String,
        role: String,
    },
    changedAt: {type: Date, Default: Date.now},
});

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
        description: { type: String, required: true },
        status: {
          type: String,
          enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
          default: "OPEN",
        },
        priority: {
          type: String,
          enum: ["LOW", "MEDIUM", "HIGH"],
          default: "MEDIUM",
        },
        createdBy: {
          name: String,
          role: String,
          userId: mongoose.Schema.Types.ObjectId,
        },
        assignedTo: {
          name: String,
          role: String,
          userId: mongoose.Schema.Types.ObjectId,
        },
        comments: [commentSchema],
        statusLogs: [statusLogSchema],
},
{timestamps: true},
);
module.exports= mongoose.model("Ticket",ticketSchema);
