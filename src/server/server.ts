import {Database} from './database';
import {Article} from './article';

const API_PORT = 8080;
const HTTP_PORT = 80;
const express = require('express');
////////////////////////////////////////////////// SERVE API ///////////////////////////////////////////////////////////////////////////////
const api = express();
const database = new Database(true);

api.use(express.json());

api.get('/api/articles', (req, res) => res.status(200).json(database.loadAll()));

api.get('/api/article/:id', (req, res) => res.status(200).json(database.load(req.params.id)));

api.post('/api/article', (req, res) => res.status(200).json(database.save(req.body as Article)));

api.put('/api/article', (req, res) => {
  database.save(req.body as Article);
  res.status(200).end();
});

api.delete('/api/article/:id', (req, res) => {
  database.delete(req.params.id);
  res.status(200).end();
});


////////////////////////////////////////////////// SERVE FRONTEND //////////////////////////////////////////////////////////////////////////

api.use('/', express.static(`${__dirname}/../../dist/assignment03`));

api.listen(process.env.PORT || 80, () => {
  console.log('Open your broswer, you should see the website at http://localhost');
  console.log('API is accessible using http://localhost/api');
});
