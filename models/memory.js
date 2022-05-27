const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date()
  },
  images: {
    type: [String],
    required: true,
    default: () => [],
  },
  comments: {
    type: [
      {
        ownerId: String,
        ownerName: String,
        comment: String,
        date: String,
      },
    ],
    default: () => [],
    required: true
  },
});



const MemoryModel = mongoose.model('memory', MemorySchema);

module.exports = MemoryModel;