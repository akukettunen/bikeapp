const { db } = require('../utils/db')
const express = require('express');
      router = express.Router();

router.get('/', (req, res) => {
  const { offset, limit } = req.query
  res.json({ok: 'ok'})
  db.query(`
    SELECT * FROM trips
    LIMIT ?, ?
    ORDER BY departure_time DESC;
  `, [offset, limit], (err, results) => {
    if(err) {
      res.status(500).send('something went wrong :/')
      return
    } else {
      res.json(results)
    }
  })
})

module.exports = router;
