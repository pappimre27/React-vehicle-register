const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Vehicle = require('../models/Vehicles');
const { formatDate } = require('../helpers/helpers');

// @route       GET api/vehicle
// @desc        GET all vehicles
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/vehicles
// @desc        Add a new vehicle
// @access      Public
router.post(
  '/',
  [
    bodyParser,
    auth,
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

    const { inspection } = req.body;

    try {
      const newVehicle = new Vehicle({
        ...req.body
      });

      newVehicle.inspection = formatDate(inspection);

      const vehicle = await newVehicle.save();
      res.json(vehicle);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route       PUT api/vehicles/:id
// @desc        update vehicle
// @access      Private
router.put('/:id', [auth, bodyParser], async (req, res) => {
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

// @route       DELETE api/vehicles/:id
// @desc        delete vehicle
// @access      Private
router.delete('/:id', [auth, bodyParser], async (req, res) => {
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
