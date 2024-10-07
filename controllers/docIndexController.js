exports.getIndexPage = (req, res)=>{
    res.render('docIndex', {
      title: 'Doctor page',
      user: res.locals.user
    })
  }