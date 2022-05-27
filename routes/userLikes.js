const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { likeMemory, unlikeMemory, getUserLikes } = require('../services/userLikes');

router.use(authMiddleware);

router.post('/likeMemory', async (request, response) => {
  const { user: { _id: userId }, body: { memoryId } } = request;
  
  const data = await likeMemory({ userId, memoryId });

  response.json(data);
});

router.post('/unlikeMemory', async (request, response) => {
  const { user: { _id: userId }, body: { memoryId } } = request;

  const data = unlikeMemory({ userId, memoryId });

  response.json(data);
});

router.get('/getUserLikes', async (request, response) => {
  const { user: { _id: userId } } = request;
  
  const likes = await getUserLikes(userId);

  response.json(likes);
});

module.exports = router;
