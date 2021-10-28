import appModulePath from 'app-module-path';
import express from 'express';
import cors from 'cors';

import { data } from './controllers/data';

appModulePath.addPath(`${__dirname}`);

const Api = express();

Api.use(cors());

Api.get('/test', (req, res) => res.status(200).send('success!'));
Api.get('/data', (req, res) => data(req, res));

Api.listen(9001, () => {
  console.log('listening on *:9001');
});
