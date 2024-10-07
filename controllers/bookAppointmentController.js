const getAllDoctors = require('./doctorsController')

exports.getIndexPage = async (req, res)=>{
    try{
      const doctors = await getAllDoctors.getAllDoctors(req, res);
      res.render('bookAppointment', {
        title: 'BookAppointment',
        doctors: doctors,
        user: res.locals.user
      })
    }catch (err){
      console.log(err)
    }
  }