exports.getIndexPage = (req, res)=>{
    res.render('patIndex', {
      title: 'Patient page',
      user: res.locals.user
    })
  }