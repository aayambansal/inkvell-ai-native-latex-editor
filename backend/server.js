const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.text());

const CLSI_URL = 'http://localhost:3013/project/scratch/compile';

app.post('/compile', async (req, res) => {
  const body = {
    compile: {
      options: { compiler: 'pdflatex' },
      rootResourcePath: 'main.tex',
      resources: [{ path: 'main.tex', content: req.body }]
    }
  };
  try {
    const clsiRes = await fetch(CLSI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const json = await clsiRes.json();
    res.status(clsiRes.status).json(json);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Backend listening on port 5000'));
