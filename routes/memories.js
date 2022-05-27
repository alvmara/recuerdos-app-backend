const express = require('express');
const { diskStorage } = require('multer');
const multer  = require('multer');
const authMiddleware = require('../middlewares/auth');
const { extname } = require('path');

const Memory = require('../models/memory');
const { listMemories, createMemory, updateMemory, search } = require('../services/memories');
const path = require('path');

const router = express.Router();

router.get('/', async (request, response) => {
  const { page } = request.query;
  const limit = 50;

  const memories = await listMemories({ page, limit });

  response.json(memories);
});

router.post('/search', async (request, response) => {
  const { body: { searchText, page } } = request;

  const result = await search({ searchText, page });

  response.json(result);
});

router.get("/uploaded/:imgpath", (request, response) => {
  console.log(request.params, request.params.imgpath);
  return response.sendFile(request.params.imgpath, {
    root: path.join(__dirname, "../files"),
  });
});


router.use(authMiddleware);

/**
 * [!] A partir de aquí, las rutas que se definan en este router requerirán de autenticación
 */

router.post('/create', async (request, response) => {
  const { user, body: memory } = request;

  memory.ownerId = user._id;
  memory.ownerName = user.userName;
  memory.date = new Date().toISOString();

  const created = await createMemory(memory);

  response.json(created);
});

router.post('/images/upload', createMulterMiddlewareFactory().array('images', 20), (request, response) => {
  const { files } = request;

  const filenames = files.map(file => `/memories/uploaded/${file.filename}`);

  response.json(filenames);
});

router.post('/:id/comment', async (request, response) => {
  const { user, body: { comment }, params: { id } } = request;

  const memory = await Memory.findById(id);
  const commentObject = {};

  commentObject.comment = comment;
  commentObject.ownerId = user._id;
  commentObject.ownerName = user.userName;
  commentObject.date = new Date().toISOString();

  memory.comments.push(commentObject);

  await updateMemory(id, memory);

  response.json(memory);
});


module.exports = router;


function createMulterMiddlewareFactory() {
  return multer({
    dest: "./files",
    storage: diskStorage({
      destination: "./files",
      filename: (req, file, callback) => {
        const name = file.originalname.split(".")[0];
        const fileExtName = extname(file.originalname);
        const randomName = Array(4)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join("");

        callback(null, `${name}-${randomName}${fileExtName}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error("Only image files are allowed!"), false);
      }

      callback(null, true);
    },
  });
}