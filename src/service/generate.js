'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {DateTime} = require(`luxon`);
const utils = require(`../utils`);
const errors = require(`../errorMessages`);
const constants = require(`../constants`);

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(path.resolve(`./src/service`, filePath), `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.log(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences) => {
  return Array(parseInt(count, 10)).fill({}).map(() => ({
    category: [categories[utils.getRandomArbitrary(1, categories.length - 1)]],
    title: titles[utils.getRandomArbitrary(1, titles.length - 1)],
    announce: utils.shuffle(sentences).slice(1, 5).join(` `),
    fullText: utils.shuffle(sentences).slice(1, 5).join(` `),
    createdDate: DateTime.local().minus({days: utils.getRandomArbitrary(0, 90)}).toFormat(`yyyy-MM-dd hh:mm:ss`),
  }));
};

const generateMocks = async (count = 1) => {
  if (count > constants.MAX_LIMIT) {
    return errors.generateMocksLimitExceeded();
  }

  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);

  const offers = generateOffers(count, titles, categories, sentences);

  try {
    await fs.writeFile(`mock.json`, JSON.stringify(offers, null, 4));
  } catch (err) {
    return process.exit(1);
  }
  return true;
};

module.exports = {
  generateMocks
};
