const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Vehicle = require('../models/Vehicles');

// @route       GET api/jobs
// @desc        GET all job posts
// @access      Public for now
router.get('/', async (req, res) => {
  try {
    const vehicle = await Vehicle.find();
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @rout      GET api/jobs/:id
// @desc      GET a job post by id
// @access    Public for now
// router.get('/:id', async (req, res) => {
//   try {
//     let jobPost = await Job.findById(req.params.id);
//     if (!jobPost) return res.status(404).json({ msg: 'No post found' });
//     res.json(jobPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// @route       POST api/jobs
// @desc        Add a new job post
// @access      Public
router.post(
  '/',
  [
    bodyParser,
    [
      check('plateNumber', 'Plate number is required')
        .not()
        .isEmpty(),
      check('manufacturer', 'Manufacturer field is required')
        .not()
        .isEmpty(),
      check('type', 'A type is required')
        .not()
        .isEmpty(),
      check('inspection', 'Inspection date is required')
        .not()
        .isEmpty(),
      check('owner', "Owner's name is required")
        .not()
        .isEmpty(),
      check('insurence', 'Insurence company name  is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newVehicle = new Job({
        ...req.body
      });
      const vehicle = await newVehicle.save();
      res.json(vehicle);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/jobs/:id
// @desc        update job post
// @access      Public
router.put('/:id', bodyParser, async (req, res) => {
  const vehicleFields = {};

  for (const [keys, values] of Object.entries(req.body)) {
    if (values) vehicleFields[keys] = values;
  }

  try {
    let vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ msg: 'No vehicle found' });
    vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: vehicleFields },
      { new: true }
    );
    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/jobs/:id
// @desc        delete job post
// @access      Public
router.delete('/:id', bodyParser, async (req, res) => {
  try {
    let vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ msg: 'No vehicle found' });
    await Vehicle.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Vehicle removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
