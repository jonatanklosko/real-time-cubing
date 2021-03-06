import * as path from 'path';
import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongodb from 'mongodb';
import * as socketIo from 'socket.io';
import * as socketIoJwt from 'socketio-jwt';

import { environment } from './environment';
import { configureRoutes } from './routes';
import { configureSockets } from './sockets';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const staticFilesPath = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.resolve(staticFilesPath, 'index.html');

app.use(bodyParser.json());
app.use(express.static(staticFilesPath));

io.use(socketIoJwt.authorize({
  secret: environment.jwtSecret,
  handshake: true
}));

mongodb.MongoClient.connect(environment.mongodbUri).then((client: mongodb.MongoClient) => {
  const db = client.db(environment.databaseName);
  configureRoutes(app, io, db);
  configureSockets(io, db);

  app.get('/*', (req, res) => {
    res.sendFile(indexHtmlPath);
  });

  server.listen(environment.port, () => console.log(`App running on port ${environment.port}`));
});
