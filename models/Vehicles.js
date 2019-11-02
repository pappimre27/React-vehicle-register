const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  inspection: {
    type: Date,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  insurence: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('vehicle', VehicleSchema);
