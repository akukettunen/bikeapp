const { db } = require('../utils/db')
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { offset, limit } = req.query

  if(!offset || !limit) {
    res.status(400).send('missing query params')
    return
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

router.get('/:id', (req, res) => {
  const { id } = req.params

  if(!id) {
    res.status(400).send('missing params')
    return
  }

  db.query(`
    SELECT
      COUNT(*) as totalUseCount,
      sum(case when departure_station_id = ? then 1 else 0 end) AS startedHereCount,
      sum(case when return_station_id = ? then 1 else 0 end) AS endedHereCount
    FROM trips
    WHERE departure_station_id = ? OR return_station_id = ?;
  `, [id, id, id, id], (err, results) => {
    if(err) {
      res.status(500).send(err)
      return
    } else {
      [ results ] = results
      res.json(results)
    }
  })
})

module.exports = router;
