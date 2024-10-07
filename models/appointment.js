const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  doctorSpecialties: {
    type: String,
    ref: 'Doctor',
    required: true
  },
  selectDoctor: {
    type: String,
    ref: 'Doctor',
    required: true
  },
  name: {
    type: String,
    ref: 'Patient',
    required: true
  },
  Date: {
    type: String,
    ref:"Date",
    required: true
  },
  Time:{
    type:String,
    ref:"Time",
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending'
  }
},
{
  timestamps: true
}
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
