const express = require('express');
const morgan = require('morgan')
const app = express();
const connectDB = require('./config/db'); 
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser, routeGuide} = require('./middlware/authMiddleware')
const path = require('path');



// Set up middleware
app.use(express.json());
app.use(morgan('dev'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routeGuide)


// logOut users
const logOutRouter = require('./routes/logOut')

// Import routes
const indexRoute = require('./routes/index');
const adminIndexRouter = require('./routes/adminIndex')
const loginAdminRouter = require('./routes/loginAdmin')
const docIndexRouter = require('./routes/docIndex');
const servicesRouter = require('./routes/services');
const appointmentsRouter = require('./routes/appointments');
const bookAppointmentsRouter = require('./routes/bookAppointment')
const userAppointmentRouter = require('./routes/userAppointment')
const doctorAppointmentRouter = require('./routes/doctorAppointment')
const aboutRouter = require('./routes/about');
const profileRouter = require('./routes/profile');
const loginPatientRouter = require('./routes/loginPatient');
const loginDoctorRouter = require('./routes/loginDoctor');
const signUpDocRouter = require('./routes/signUpDoc')
const signUpPatientRouter = require('./routes/signUpPatient')
const contactRouter = require('./routes/contact');
const facilitiesRouter = require('./routes/facilities');
const newsRouter = require('./routes/news');
const patientsRouter = require('./routes/patIndex');
// Import other route files as needed

// Set up routes
app.get('*', checkUser)      // apply to every routes

app.use('/logOut', logOutRouter)


app.use('/', indexRoute);
app.use('/admin', requireAuth, adminIndexRouter)
app.use('/loginAdmin', loginAdminRouter)
app.use('/doctors', requireAuth , docIndexRouter);
app.use('/services', servicesRouter);
app.use('/userAppointment', requireAuth, userAppointmentRouter)
app.use('/doctorAppointment', requireAuth, doctorAppointmentRouter)
app.use('/appointments', requireAuth, appointmentsRouter);
app.use('/bookAppointment', requireAuth, bookAppointmentsRouter)
app.use('/about', aboutRouter);
app.use('/profile', requireAuth, profileRouter)
app.use('/loginPatient', loginPatientRouter);
app.use('/loginDoctor', loginDoctorRouter)
app.use('/signUpDoctor', signUpDocRouter )
app.use('/signUpPatient', signUpPatientRouter)
app.use('/contact', contactRouter);
app.use('/facilities', facilitiesRouter);
app.use('/news', newsRouter);
app.use('/patients', requireAuth, patientsRouter);




//cookies
// installed express-cookieParser before proceeding

// app.get('/set-cookies', (req, res) => {

//   // res.setHeader('set-cookie', 'newUser=true')
//   res.cookie('newUser', true, {
//     maxAge:1000 * 60 * 60 * 24,         //how long the cookie is to live for.(24hrs)
//     secure:true
//   })

//   res.cookie('isEmployed', true, {
//     maxAge: 1000 * 60 * 60 *24,
//     httpOnly:true                    //cookie will be unavailable to javascript
//   })

//   res.send('You got the cookies')
// })


// // Read Cookies

// app.get('/read-cookies', (req, res)=>{
  
//   const cookies = req.cookies;
//   console.log(cookies.newUser)

//   res.json(cookies)
// })

// // end cookies


app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Call connectDB function to establish the database connection
connectDB().then(() => {
  console.log('Connected to MongoDB')
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => console.log(err));

  










// [ {
//   doctor: ObjectId("6480301ab2f657830a106f9e"),
//   patient: ObjectId("648030a5b2f657830a106fa5"),
//   appointmentDateTime: ISODate("2023-06-01T10:00:00Z"),
//   status: "confirmed"
// },
// {
//   doctor: ObjectId("6480301ab2f657830a106f9f"),
//   patient: ObjectId("648030a5b2f657830a106fa4"),
//   appointmentDateTime: ISODate("2023-06-02T14:30:00Z"),
//   status: "pending"
// },
// {
//   doctor: ObjectId("6480301ab2f657830a106fa0"),
//   patient: ObjectId("648030a5b2f657830a106fa6"),
//   appointmentDateTime: ISODate("2023-06-03T11:45:00Z"),
//   status: "confirmed"
// },]

// [
//   {
//     "title": "New Hospital Wing Opening",
//     "description": "We are excited to announce the opening of our new hospital wing, equipped with state-of-the-art facilities.",
//     "publicationDate": ISODate("2023-05-30T00:00:00Z"),
//     "author": "Hospital Administration",
//     "relatedImages": ["image1.jpg", "image2.jpg"]
//   },
//   {
//     "title": "Health Tips for Summer",
//     "description": "Stay hydrated and protect yourself from the sun. Follow these health tips to have a safe and enjoyable summer.",
//     "publicationDate": ISODate("2023-06-01T00:00:00Z"),
//     "author": "Dr. Jane Smith",
//     "relatedImages": ["image3.jpg"]
//   },
//   {
//     "title": "Community Health Seminar",
//     "description": "Join us for a community health seminar on June 15th to learn about common health issues and prevention strategies.",
//     "publicationDate": ISODate("2023-06-03T00:00:00Z"),
//     "author": "Hospital Outreach Team",
//     "relatedImages": ["image4.jpg"]
//   }
// ]


// [
//   {
//     name: "John Doe",
//     email: "johndoe@example.com",
//     message: "I have a question about your services.",
//     submittedAt: ISODate("2023-06-01T08:30:00Z")
//   },
//   {
//     name: "Jane Smith",
//     email: "janesmith@example.com",
//     message: "I would like to inquire about appointment availability.",
//     submittedAt: ISODate("2023-06-02T15:20:00Z")
//   },
//   {
//     name: "David Johnson",
//     email: "davidjohnson@example.com",
//     message: "I need assistance with my medical records.",
//     submittedAt: ISODate("2023-06-03T10:15:00Z")
//   },
// ]

// [
//   {
//     name: "Cardiology",
//     description: "Specialized care for heart-related conditions",
//     department: "Medical",
//     doctors: [ObjectId("6480301ab2f657830a106f9e"), ObjectId("6480301ab2f657830a106f9f")]
//   },
//   {
//     name: "Pediatrics",
//     description: "Medical care for infants, children, and adolescents",
//     department: "Medical",
//     doctors: [ObjectId("6480301ab2f657830a106f9e")]
//   },
//   {
//     name: "Orthopedics",
//     description: "Treatment for musculoskeletal conditions and injuries",
//     department: "Surgical",
//     doctors: [ObjectId("6480301ab2f657830a106fa0")]
//   }
// ]

