const UserLikes = require('../models/userLike');

async function likeMemory(params) {
    return UserLikes.create(params);
}

async function unlikeMemory(params) {
    return UserLikes.deleteOne(params);
}

async function getUserLikes(userId) {
    const userLikes = await UserLikes.find({ userId });

    return userLikes.map(({ memoryId }) => memoryId);
}

module.exports = { likeMemory, unlikeMemory, getUserLikes };