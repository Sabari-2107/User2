const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_FILE = path.join(__dirname, 'User_data.txt');

function readUsers() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const txt = fs.readFileSync(DATA_FILE, 'utf8').trim();
  if (!txt) return [];
  return txt.split('\n').map(line => {
    const [name, age, mail, password] = line.split('|');
    return { name, age, mail, password };
  });
}

function writeUser(u) {
  const line = `${u.name}|${u.age}|${u.mail}|${u.password}\n`;
  fs.appendFileSync(DATA_FILE, line, 'utf8');
}

app.post('/register', (req, res) => {
  const { name, age, mail, password } = req.body || {};
  if (!name || !age || !mail || !password) return res.json({ success: false, message: 'Missing fields' });
  const users = readUsers();
  if (users.find(u => u.mail.toLowerCase() === mail.toLowerCase())) {
    return res.json({ success: false, message: 'Email already registered' });
  }
  try {
    writeUser({ name, age, mail, password });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: 'Write error' });
  }
});

app.post('/login', (req, res) => {
  const { mail, password } = req.body || {};
  if (!mail || !password) return res.json({ success: false });
  const users = readUsers();
  const found = users.find(u => u.mail.toLowerCase() === mail.toLowerCase() && u.password === password);
  if (found) return res.json({ success: true });
  return res.json({ success: false });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
