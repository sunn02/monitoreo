import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Client } = pkg;

const app = express();
app.use(express.json());

const PORT = 4000;

// Configuración de PostgreSQL
const dbClient = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: 'central_logging_db',
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
dbClient.connect();

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // No se proporciona token

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token no válido
        req.user = user;
        next();
    });
};

// Endpoint para recibir logs
app.post('/logs', authenticateToken, (req, res) => {
    const { service_name, severity_level, message, timestamp } = req.body;

    // Inserción en la base de datos
    const query = `
        INSERT INTO logs (service_name, severity_level, message, timestamp)
        VALUES ($1, $2, $3, $4)
    `;
    const values = [service_name, severity_level, message, timestamp];

    dbClient.query(query, values, (err) => {
        if (err) {
            console.error('Error al insertar log:', err);
            return res.status(500).json({ error: 'Error al insertar log' });
        }
        res.status(200).json({ message: 'Log recibido y almacenado' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor central escuchando en http://localhost:${PORT}`);
});




