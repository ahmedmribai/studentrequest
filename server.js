const express   = require('express');
const connectDB = require('./config/db');
let cors        = require('cors');

const app =express();

// ========== connect database ==========
connectDB();

// ========== use cors ==================
app.use(cors());

// ========== init middleware ===========
app.use(express.json({ extended: false}));

app.get('/', (req, res) => res.send('API running'));

// import routes
const studentRoute = require('./routes/students/student.route');
const adminRoute   = require('./routes/administration/admin.route');
const requestRoute = require('./routes/request/request.route');
const respondRoute = require('./routes/respond/respond.route');

// init routes
app.use('/api/students', studentRoute);
app.use('/api/admins', adminRoute);
app.use('/api/messages', requestRoute);
app.use('/api/responses', respondRoute);

// app port
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log("server is listening on port 4000");
});