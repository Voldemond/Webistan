
const db = require('../config/db');
const Booking = require('../models/booking');
const bookingModel = new Booking(db);

exports.createBooking = (req, res) => {
    const data = req.body;
    bookingModel.create(data, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating booking' });
        res.status(201).json({ message: 'Booking created successfully', id: result.insertId });
    });
};

exports.getBookings = (req, res) => {
    bookingModel.getAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching bookings' });
        res.json(results);
    });
};

exports.getBookingById = (req, res) => {
    const id = req.params.id;
    bookingModel.getById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching booking' });
        res.json(results[0]);
    });
};

exports.updateBooking = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    bookingModel.update(id, data, (err) => {
        if (err) return res.status(500).json({ message: 'Error updating booking' });
        res.json({ message: 'Booking updated successfully' });
    });
};

exports.deleteBooking = (req, res) => {
    const id = req.params.id;
    bookingModel.delete(id, (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting booking' });
        res.json({ message: 'Booking deleted successfully' });
    });
};
