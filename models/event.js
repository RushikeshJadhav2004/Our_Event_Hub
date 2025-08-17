const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventImage: {
        type: String,  // Store image URL or file path
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    eventType: {
        type: String,
        required: true,
        // enum: ['Conference', 'Workshop', 'Meetup', 'Concert', 'Festival', 'Other'] // you can add more types
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    expectedAttendance: {
        type: Number,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    contactPhone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
