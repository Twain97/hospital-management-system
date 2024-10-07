const jwt = require('jsonwebtoken')
const Doctor = require('../models/doctor')
const Patient = require('../models/patient')
const Admin   = require('../models/admin')

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt

    // check if jwt exists
    if(token){
        jwt.verify(token, "hospital secret", (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/');
            }else{
                console.log(decodedToken);
                next();
            }
        });
    }else{
        res.redirect('/');
    }
    
}


// check current user
const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "hospital secret", async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let DocUser = await Doctor.findById(decodedToken.id)
                let PatientUser = await Patient.findById(decodedToken.id)
                let AdminUser = await Admin.findById(decodedToken.id)
                if(DocUser){
                    res.locals.user = DocUser;
                    console.log("current user:= ",DocUser.name)
                }else if(PatientUser){
                    res.locals.user = PatientUser;
                    console.log("current user:= ", PatientUser.name)
                }else if(AdminUser){
                    res.locals.user = AdminUser;
                    console.log("current user:= ",AdminUser.name)
                }
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

// guide routes
// this protects authorized users from accessing routes that are not allowed for their roles

const routeGuide = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, "hospital secret", async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                next();
            }else{
                console.log(decodedToken);
                const route = `${req.method} ${req.originalUrl}`
                const doctor = await Doctor.findById(decodedToken.id)
                const patient = await Patient.findById(decodedToken.id)
                const admin = await Admin.findById(decodedToken.id)
                if(doctor){
                    res.locals.user = doctor;
                    if(route == 'GET /patients'|| route == 'GET /admin' || route == 'GET /loginDoctor' || route == 'GET /loginDoctor'
                        || route == 'GET /loginAdmin' || route == 'GET /signUpPatient' || route == 'GET /signUpDoc'){
                        console.log("Route not allowed")
                        return res.redirect('/doctors')
                    }
                }else if(patient){
                    res.locals.user = patient;
                    if(route == 'GET /doctors' || route == 'GET /admin' || route == 'GET /loginPatient' || route == 'GET /loginDoctor'
                        || route == 'GET /loginAdmin' || route == 'GET /signUpPatient' || route == 'GET /signUpDoc'){
                        console.log("Route not allowed")
                        return res.redirect('/patients')
                    }
                }else if(admin){
                    res.locals.user = admin;
                    if(route == 'GET /doctors' || route == 'GET /patients' || route == 'GET /loginAdmin' || route == 'GET /loginDoctor'
                        || route == 'GET /loginPatient' || route == 'GET /signUpDoc' || route == 'GET /signUpPatient'){
                        console.log("Route not allowed")
                        return res.redirect('/admin')
                    }
                }
            }
        })
    }
    console.log(`Accessing route =  ${req.method} ${req.originalUrl}`)
    next();
}
module.exports = {requireAuth, checkUser, routeGuide}  // to be required on every protected routes in app.js