'use strict';

const express = require(`express`);
const articlesRouter = require(`../routes/articles`);
const categoriesRouter = require(`../routes/categories`);
const homeRouter = require(`../routes/home`);
const loginRouter = require(`../routes/login`);
const myRouter = require(`../routes/my`);
const registerRouter = require(`../routes/register`);
const searchRouter = require(`../routes/search`);

const app = express();
const port = 8080;

app.use(`/articles`, articlesRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/`, homeRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
