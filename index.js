var express = require('express');
var path = require('path');
var app = express();

app.use(require('body-parser').json());
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/new-data', (req, res) => {
  const storyPiece = req.body.storyPiece;
  if (!global.storyData) global.storyData = [];
  if (storyPiece) {
    global.storyData.push(storyPiece);
    res.json({ message: 'Story piece added successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid data submitted' });
  }
});

app.get('/data', (req, res) => {
  res.json(global.storyData || []);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

