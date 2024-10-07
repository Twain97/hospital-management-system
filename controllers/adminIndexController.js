const getAllDoctors = require('./doctorsController');
const getAllPatients = require('./patientsController');
const getAllAppoint = require('./appointmentsController');



exports.adminPage = async (req, res) => {
  try {
    const doctors = await getAllDoctors.getAllDoctors(req, res);
    const patients = await getAllPatients.getAllPatients(req, res);
    const appointments = await getAllAppoint.getAllAppointments(req, res);

    res.render('adminIndex',
      { 
        title: "ADMIN", 
        doctors: doctors, 
        patients: patients, 
        appointments:appointments,
        user: res.locals.user
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
};
