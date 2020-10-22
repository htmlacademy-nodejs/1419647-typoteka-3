'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const port = 8080;
app.set(`views`, path.join(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.join(__dirname, `./public`)));

app.use(`/search`, (req, res) => {
  res.render(`search-1`);
});

app.use(`/register`, (req, res) => {
  res.render(`registration`);
});

app.use(`/my`, (req, res) => {
  res.render(`admin-publications`);
});

app.use(`/login`, (req, res) => {
  res.render(`registration`);
});

app.use(`/categories`, (req, res) => {
  res.render(`admin-categories`);
});

app.use(`/articles`, (req, res) => {
  res.render(`publications-by-category`);
});

app.use(`/`, (req, res) => {
  res.render(`main`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
