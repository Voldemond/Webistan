
class Booking {
    constructor(db) {
        this.db = db;
    }

    create(data, callback) {
        const query = 'INSERT INTO bookings (customer_name, email, pickup_location, pickup_date, return_date) VALUES (?, ?, ?, ?, ?)';
        const values = [data.customer_name, data.email, data.pickup_location, data.pickup_date, data.return_date];
        this.db.query(query, values, callback);
    }

    getAll(callback) {
        this.db.query('SELECT * FROM bookings', callback);
    }

    getById(id, callback) {
        this.db.query('SELECT * FROM bookings WHERE id = ?', [id], callback);
    }

    update(id, data, callback) {
        const query = 'UPDATE bookings SET customer_name = ?, email = ?, pickup_location = ?, pickup_date = ?, return_date = ? WHERE id = ?';
        const values = [data.customer_name, data.email, data.pickup_location, data.pickup_date, data.return_date, id];
        this.db.query(query, values, callback);
    }

    delete(id, callback) {
        this.db.query('DELETE FROM bookings WHERE id = ?', [id], callback);
    }
}

module.exports = Booking;
