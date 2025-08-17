const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const eventController = require('./controller/eventcontroller');
const multer = require('multer');
const fs = require('fs');
const app = express();

const Event = require('./models/event');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// MongoDB Connection
mongoose.connect('mongodb+srv://rj507943:VmYlUKzNGCqtG8iD@cluster0.vyao6re.mongodb.net/', {
    dbName: 'Event_Management'
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => res.render('index'));


// app.get('/details', async (req, res) => {
//   try {
//     const events = await eventController.events; // call the model directly
//     res.render('details', { events });
//   } catch (error) {
//     console.error(error);
//     res.render('details', { events: [] });
//   }
// });



app.get('/add', (req, res) => res.render('add'));



app.get('/events', eventController.events);



// ✅ Single correct POST route
app.post('/add', upload.single('image'), eventController.createEvent);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
