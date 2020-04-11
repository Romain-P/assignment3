import {Database} from './database';
import {Article} from './article';

const API_PORT = 8080;
const HTTP_PORT = 80;
const express = require('express');
////////////////////////////////////////////////// SERVE API ///////////////////////////////////////////////////////////////////////////////
const api = express();
const database = new Database(true);

api.use(express.json());

api.get('/', (req, res) => res.status(200).send('Welcome to the assignment03 API'));

api.get('/articles', (req, res) => res.status(200).json(database.loadAll()));

api.get('/article/:id', (req, res) => res.status(200).json(database.load(req.params.id)));

api.post('/article', (req, res) => res.status(200).json(database.save(req.body as Article)));

api.put('/article', (req, res) => {
  database.save(req.body as Article);
  res.status(200).end();
});

api.delete('/article/:id', (req, res) => {
  database.delete(req.params.id);
  res.status(200).end();
});

api.listen(API_PORT, 'localhost', () => console.log('API started with success'));

////////////////////////////////////////////////// SERVE FRONTEND //////////////////////////////////////////////////////////////////////////
/**const app = express();

app.use('/', express.static(`${__dirname}/../../dist/assignment03`));

const request = require('request');
app.use('/api', (req, res) => req.pipe(request(`http://localhost:${API_PORT}${req.url}`)).pipe(res));

app.listen(HTTP_PORT, 'localhost', () => {
  console.log('Open your broswer, you should see the website at http://localhost');
  console.log('API is accessible using http://localhost/api');
});
**/
