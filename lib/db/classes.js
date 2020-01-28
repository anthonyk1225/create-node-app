'use strict';
const models = require('../models');
const { classes: modelClasses } = models;

const getAllClasses = async () => {
  try {
    const classes = await modelClasses.findAll().map(el => el.get({ plain: true }));
    return { success: true, data: classes };
  } catch (e) {
    return { success: false, description: e };
  }
};

module.exports = {
    getAllClasses,
};
