const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Board = require('./schemas/boardSchema');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

const db = 'mongodb://localhost/your_board_db';
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

// 라우팅
app.get('/api/boards', async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});

app.post('/api/write', async (req, res) => {
  const { title, content } = req.body;
  const newBoard = new Board({ title, content });
  await newBoard.save();
  res.json({ success: true });
});

mongoose.set('bufferTimeoutMS', 30000); // 타임아웃 값을 30초로 설정
const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
