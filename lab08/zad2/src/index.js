const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;
const redisClient = redis.createClient({
  url: 'redis://redis-server:6379'
});

app.use(express.json());

redisClient.on('error', (err) => {
  console.error('Error connecting to Redis', err);
});

redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch(err => {
  console.error('Failed to connect to Redis', err);
  process.exit(1);
});

// Endpoint do dodawania wiadomości
app.post('/message', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send('Message is required');
  }
  const messageId = `message:${Date.now()}`;
  try {
    await redisClient.set(messageId, message);
    res.send({ id: messageId, message, status: 'Message saved successfully' });
  } catch (err) {
    res.status(500).send('Error saving message');
  }
});

// Endpoint do odczytywania wiadomości
app.get('/message/:id', async (req, res) => {
  const messageId = req.params.id;
  try {
    const reply = await redisClient.get(messageId);
    if (reply === null) {
      return res.status(404).send('Message not found');
    }
    res.send({ id: messageId, message: reply });
  } catch (err) {
    res.status(500).send('Error retrieving message');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await redisClient.quit();
  process.exit();
});
