const express = require('express');
const Station = require('../models/Station');
const auth = require('../middleware/auth');
const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
  const station = new Station({ ...req.body, createdBy: req.user.userId });
  await station.save();
  res.status(201).json(station);
});

// Read all
// routes/stations.js
router.get('/', async (req, res) => {
  try {
    const stations = await Station.find(); // or your DB query
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update
router.put('/:id', auth, async (req, res) => {
  try{
  const station = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
   res.status(200).json(station);
   
   console.log('UPDATE DATA:', req.body);

  } catch (err) {
    console.error('Error updating station:', err);
    res.status(500).json({ message: 'Failed to update station' });
  }});

// Delete
router.delete('/:id', auth, async (req, res) => {
  await Station.findByIdAndDelete({ _id: req.params.id, createdBy: req.user.userId });
  res.json({ message: 'Deleted' });
});

module.exports = router;
