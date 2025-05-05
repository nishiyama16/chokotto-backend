const express = require('express');
const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(require('cors')());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }],
    });

    res.json(response.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'APIエラーが発生しました' });
  }
});

app.listen(3000, () => {
  console.log('🚀 サーバー起動中： http://localhost:3000');
});
