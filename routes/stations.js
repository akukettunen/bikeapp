const { db } = require('../utils/db')
const express = require('express');
      router = express.Router();

router.get('/', (req, res) => {
  const { offset, limit } = req.query

  if(!offset || !limit) {
    res.status(400).send('missing query params')
  }

  db.query(`
    SELECT *
    FROM stations
    LIMIT ?, ?;
  `, [parseInt(offset), parseInt(limit)], (err, results) => {
    if(err) {
      res.status(500).send(err)
      return
    } else {
      res.json(results)
    }
  })
})

module.exports = router;
