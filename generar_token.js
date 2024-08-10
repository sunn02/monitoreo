import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const token = jwt.sign({ username: 'testuser' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
console.log('Token JWT de prueba:', token);

