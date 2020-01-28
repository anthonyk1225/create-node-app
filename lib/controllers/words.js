'use strict';
const express = require('express');
const router = express.Router();
const modelWords = require('../db/words');

router.get('/', [], async (req, res, next) => {
  try {
    const result = await modelWords.getAllWords();
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

router.get('/:class_id', [], async (req, res, next) => {
  try {
    const result = await modelWords.getWordsByClassId(req.params);
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
