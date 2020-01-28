'use strict';
const models = require('../models');
const { words: modelWords } = models;

const getAllWords = async () => {
  try {
    const words = await modelWords.findAll().map(el => el.get({ plain: true }));
    return { success: true, data: words };
  } catch (e) {
    return { success: false, description: e };
  }
};

const getWordsByClassId = async ({ class_id }) => {
  try {
    const words = await modelWords.findAll({
      where: { class_id },
    }).map(el => el.get({ plain: true }));
    return { success: true, data: words };
  } catch (e) {
    return { success: false, description: e };
  }
};

module.exports = {
  getAllWords,
  getWordsByClassId,
};
