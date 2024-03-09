const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String},
    creatorId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    assigneeId:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
    dueDate:{type:Date,default:Date.now()},
    priority:{type:String,required:true,default:'low'},
    status:{type:String,required:true,default:'todo'},
    tags:[{type:String}],
},{timestamps:true});

module.exports = mongoose.model('tasks',taskSchema);