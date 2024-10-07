const getAllAppointments = require('./appointmentsController')

exports.getIndexPage = async (req, res)=>{
    try{
      const appointments = await getAllAppointments.getAllAppointments(req, res);
      res.render('doctorAppointments', {
        title: 'Doctor Appointment',
        appointments: appointments,
        user: res.locals.user
      })
    }catch (err){
      console.log(err)
    }
  }