import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// person Schema
const personSchema = new Schema({
  firstName: {type: 'String', required: true},
  lastName: {type: 'String', required: true},
  remark: {type: 'String'},
  createdDate: {type: Date, default: Date.now},
  updatedDate: {type: Date, default: Date.now}
});

export default mongoose.model('Person', personSchema);
