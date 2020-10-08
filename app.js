import http from 'http';

import app from './config/app.config';

const server = http.createServer(app);

server.listen(constants.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    logger.info(`Server is running on port ${host}:${port}`);
});