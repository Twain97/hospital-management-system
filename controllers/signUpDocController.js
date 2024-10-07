const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken')


// handle errors
const handleErrors = (err)=>{
  console.log(err.message, err.code)
  let errors = {
    email:"",
    password:"",
    specialties:"",
    qualifications:"", 
    experience:"", 
    contactInformation: ""
  }
// duplicate error code 
if(err.code==11000){
  errors.email = "Email already used"
  return errors;
}

  //validation error
  if(err.message.includes('Doctor validation failed')){
    Object.values(err.errors).forEach(({properties})=>{
      errors[properties.path]= properties.message
    })
  }

  return errors
}

// create Tokens
const maxAge = 3 * 24 * 60 *60    // 3days

const createToken = (id)=>{
  return jwt.sign({id}, 'hospital secret', {
    expiresIn: maxAge
  });
}

exports.getCreatePage = (req, res) => {
    // Logic to fetch any necessary data or render the appropriate view
    res.render('signUpDoc', {title: 'Sign Up'});
  };

  exports.signup_post = async (req, res)=>{
    const { name,email, password, role, specialties, qualifications, experience, contactInformation } = req.body;
    try{
      const doctor = await Doctor.create({ name,email, password, role, specialties, qualifications, experience, contactInformation });
      const token = createToken(doctor._id)

      res.cookie('jwt', token, {httpOnly:true, maxAge : maxAge * 1000})
      res.status(201).json({doctor :doctor._id});
    }catch(err){
      const errors = handleErrors(err)
      res.status(400).json({errors})
    }
  }


  