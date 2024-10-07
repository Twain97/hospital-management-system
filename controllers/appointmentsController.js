const Appointment = require('../models/appointment');

// Controller method for fetching all appointments
exports.getAllAppointments = async (req, res) => {
    try{
      const appointments = await Appointment.find({}) 
      return appointments
    }catch(err) {
      console.error(err);
      res.status(500).send('An error occurred');
    };
};

// Controller method for fetching a single appointment by ID
exports.getAppointmentById = (req, res) => {
  const { id } = req.params;

  Appointment.findById(id)
    .populate('doctor')
    .populate('patient')
    .then(appointment => {
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json(appointment);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
};

// Controller method for creating a new appointment
exports.createAppointment = async (req, res) => {
  const { doctorSpecialties, selectDoctor, name, Date, Time, status } = req.body;

  try{
    const appointment = await Appointment.create( { doctorSpecialties, selectDoctor, name, Date, Time, status })
    
    res.status(201).json({appointment: appointment._id})
  }catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
  };
};

// Controller method for updating an appointment
exports.updateAppointment = async (req, res) => {
  const { id, status, selectDoctor, doctorSpecialties, Date, Time } = req.body; // Get all fields from body

  try{
    const appointment = await Appointment.findByIdAndUpdate(id, {
      status,
      selectDoctor,
      doctorSpecialties,
      Date,
      Time 
    }, { new: true }); // Update the appointment with new values

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment); // Send back the updated appointment
  } catch(err) {
      console.error(err);
      res.status(500).send('An error occurred');
  };
};

// Controller method for deleting an appointment
exports.deleteAppointment = (req, res) => {
  const { id } = req.params;

  Appointment.findByIdAndRemove(id)
    .then(appointment => {
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json({ message: 'Appointment deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('An error occurred');
    });
};
