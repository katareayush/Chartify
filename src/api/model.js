import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  serialNo: {
    type: String,
    required: true
  },
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  deviceMapID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeviceMap',
    required: true
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }],
  total_kwh: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  ac_run_hrs: {
    type: Number,
    required: true
  },
  ac_fan_hrs: {
    type: Number,
    required: true
  },
  algo_status: {
    type: Number,
    required: true
  },
  billing_ammount: {
    type: Number,
    required: true
  },
  cost_reduction: {
    type: Number,
    required: true
  },
  energy_savings: {
    savings_percent: {
      type: Number,
      required: true
    },
    ref_kwh: {
      type: Number,
      required: true
    },
    us_meter: {
      type: Number,
      required: true
    },
    us_calc: {
      type: Number,
      required: true
    },
    inv_factor: {
      type: Number,
      required: true
    }
  },
  mitigated_co2: {
    type: Number,
    required: true
  },
  weather: {
    max_temp: {
      type: Number,
      required: true
    },
    min_temp: {
      type: Number,
      required: true
    }
  }
}, { timestamps: true });

export const Data = mongoose.model('Data', dataSchema, 'data');

