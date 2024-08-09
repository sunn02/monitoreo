console.clear();

import { createServer } from "http";

const httpServer = createServer((req, res) => {
    console.log("PETICION RECIBIDA"); 
    res.end('Recibido kpe')
});

httpServer.listen(1234);
