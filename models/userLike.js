const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserLikesSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  memoryId: {
    type: String,
    required: true,
  }
});


UserLikesSchema.index(
  {
    userId: 1,
    memoryId: 1,
  },
  {
    unique: true,
  }
);

const UserLikesModel = mongoose.model("userLikes", UserLikesSchema);

module.exports = UserLikesModel;
