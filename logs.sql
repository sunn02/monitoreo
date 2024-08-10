INSERT INTO logs (service_name, severity_level, message, timestamp)
VALUES ('test-service', 'info', 'This is a test log message', NOW());CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    service_name TEXT NOT NULL,
    severity_level TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL
);


SELECT * FROM logs;


