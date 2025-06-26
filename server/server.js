// IMPORT DEPENDENCIES 

// Express: for building RESTful APIs easily and creating our server.
import express from 'express';

// fs/promises: for reading and writing JSON file (our simple database).
import fs from 'fs/promises';

// bcrypt: for hashing (scrambling) passwords securely.
import bcrypt from 'bcrypt';

// cors: for letting the frontend talk to this backend API.
import cors from 'cors';

//  CREATE SERVER APP

// Create an Express app (our server).
const app = express();

// Allow requests from other sites (frontend).
app.use(cors());

// Parse incoming JSON data automatically.
app.use(express.json());

// File where we will store user data (our "database").
const USERS_FILE = './users.json';

// HELPER FUNCTIONS 

// Load users: 
// - Read users.json file.
// - Convert text to JavaScript array.
// - Return empty array if file doesn’t exist yet.
async function loadUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save users:
// - Convert user list to text.
// - Write to users.json (formatted nicely).
async function saveUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

//  ROUTE: REGISTER 
app.post('/register', async (req, res) => {
  // Get email and password from request body.
  const { email, password } = req.body;

  // Check that both email and password are provided.
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Load existing users.
  const users = await loadUsers();

  // Check if user already exists.
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Hash the password:
  // - 10 means bcrypt will take ~100ms to hash (good balance of security + speed).
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add new user to users list.
  users.push({ email, password: hashedPassword });

  // Save updated users list to file.
  await saveUsers(users);

  // Send success response.
  res.json({ message: 'Registered successfully' });
});

// ROUTE: LOGIN 

app.post('/login', async (req, res) => {
  // Get email and password from request body.
  const { email, password } = req.body;
  // Check that both email and password are provided.
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Load existing users.
  const users = await loadUsers();

  // Find user by email.
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Compare provided password with hashed password in file.
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Send success response.
  res.json({ message: 'Login successful' });
});

//START SERVER 

// Start server on port 5000.
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
