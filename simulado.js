
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_NAME = 'my-service';
const LOG_SERVER_URL = process.env.LOG_SERVER_URL;

const logData = {
    service_name: SERVICE_NAME,
    severity_level: 'info',
    message: 'Este es un mensaje de prueba',
    timestamp: new Date().toISOString()
};

const sendLog = async () => {
    try {
        const response = await axios.post(`${LOG_SERVER_URL}/receive-log`, logData, {
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });
        console.log('Log enviado con éxito:', response.data);
    } catch (error) {
        console.error('Error al enviar el log:', error.response ? error.response.data : error.message);
    }
};

setInterval(sendLog, 10000);

