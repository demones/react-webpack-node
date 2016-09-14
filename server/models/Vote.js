import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// vote Schema
const voteSchema = new Schema({
  count: {type: 'Number', required: true},
  content: {type: 'String', required: true},
  createdDate: {type: Date, default: Date.now},
  updatedDate: {type: Date, default: Date.now}
});

export default mongoose.model('Vote', voteSchema);
