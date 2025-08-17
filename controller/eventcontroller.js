const Event = require('../models/event');

exports.createEvent = async (req, res) => {
    try {
        const { title, eventType, description, location, eventDate, startTime, endTime, expectedAttendance, contactEmail, contactPhone, website } = req.body;

        const event = new Event({
            title,
            eventType,
            description,
            location,
            eventDate,
            startTime,
            endTime,
            expectedAttendance,
            contactEmail,
            contactPhone,
            website,
            eventImage: req.file ? `/uploads/${req.file.filename}` : null
        });

        await event.save();
        console.log('Event saved:', event);

        res.redirect('/events'); // Or send JSON if you want API
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving event');
    }
};

exports.events = async (req, res) => {
    try {
        const events = await Event.find();
        res.render('display', { events });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching events');
    }
};
