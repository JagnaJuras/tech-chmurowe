const express = require('express');
const redis = require('redis');
const db = require('./db');

const app = express();
const port = 3000;
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
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

// Endpoint strony głównej
app.get('/', (req, res) => {
  res.send('Welcome to the Express + Redis + PostgreSQL API!');
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

// Endpoint do dodawania użytkowników
app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }
  try {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error saving user');
  }
});

// Endpoint do pobierania użytkowników
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.send(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error retrieving user');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await redisClient.quit();
  process.exit();
});
