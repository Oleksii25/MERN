const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path')

const app = express();
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/links', require('./routes/link.routes'));
app.get('*', (req, res) => {
  const index = path.join(__dirname, './client/public/index.html');
  const styles = path.join(__dirname, './client/public/main-b4dc54c0.css');
  res.sendFile(index, styles);
})


const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri');

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();