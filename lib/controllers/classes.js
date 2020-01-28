'use strict';
const express = require('express');
const router = express.Router();
const modelClasses = require('../db/classes');

router.get('/', [], async (req, res, next) => {
  try {
    const result = await modelClasses.getAllClasses();
    if (result.success) return res.json(result);
    return res.status(500).send({
      error: {
        type: "an unexpected error occured",
        description: result.description,
      }
    });
  } catch (e) {
    return res.status(500).send({
      error: {
        type: "an unexpected error occured",
        description: e,
      }
    });
  }
});

module.exports = router;
