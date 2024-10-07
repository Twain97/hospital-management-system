const getAllAppointments = require('./appointmentsController')

exports.getIndexPage = async (req, res)=>{
    try{
      const appointments = await getAllAppointments.getAllAppointments(req, res);
      res.render('userAppointments', {
        title: 'User Appointment',
        appointments: appointments,
        user: res.locals.user
      })
    }catch (err){
      console.log(err)
    }
  }