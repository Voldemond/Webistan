
const API_BASE_URL = 'http://localhost:5000/api/bookings';


document.getElementById('signupForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        
        if (!response.ok) {
            alert(`Error: ${data.message}`);
            return;
        }

        alert('Account created successfully! You can sign in now.');
        window.location.href = 'signin.html';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the account. Please try again.');
    }
});

// Sign In
document.getElementById('signinForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Error: ${data.message}`);
            return;
        }

        alert('Sign in successful!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing in. Please try again.');
    }
});

/* 
// Local storage function placeholders (commented out)

function loadBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}
*/

// Fetch all bookings from the backend
async function fetchBookings() {
    const response = await fetch(API_BASE_URL);
    return response.json();
}

// Create a new booking on the backend
async function createBooking(bookingData) {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    return response.json();
}

// Update a booking by ID on the backend
async function updateBooking(id, bookingData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    return response.json();
}

// Delete a booking by ID on the backend
async function removeBookingFromBackend(id) {
    await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
}

// Display bookings from the backend
async function displayBookings() {
    const bookingListDiv = document.getElementById('booking-list');
    if (!bookingListDiv) return;

    try {
        const bookings = await fetchBookings();
        bookingListDiv.innerHTML = '';

        bookings.forEach((booking) => {
            const bookingDiv = document.createElement('div');
            bookingDiv.classList.add('col-md-4', 'mb-4');
            bookingDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${booking.customer_name}</h5>
                        <p>Email: ${booking.email}</p>
                        <p>Pick-up Location: ${booking.pickup_location}</p>
                        <p>Pick-up Date: ${booking.pickup_date}</p>
                        <p>Return Date: ${booking.return_date}</p>
                        <button class="btn btn-primary" onclick="openEditModal(${booking.id})">Edit Booking</button>
                        <button class="btn btn-danger" onclick="deleteBooking(${booking.id})">Cancel Booking</button>
                    </div>
                </div>
            `;
            bookingListDiv.appendChild(bookingDiv);
        });
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

// Open Edit Modal with booking data loaded
async function openEditModal(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        const booking = await response.json();

        document.getElementById('editFullName').value = booking.customer_name;
        document.getElementById('editEmail').value = booking.email;
        document.getElementById('editPickupLocation').value = booking.pickup_location;
        document.getElementById('editPickupDate').value = booking.pickup_date;
        document.getElementById('editReturnDate').value = booking.return_date;
        document.getElementById('editIndex').value = id;

        $('#editBookingModal').modal('show');
    } catch (error) {
        console.error('Error fetching booking details:', error);
    }
}

// Update 
document.getElementById('editBookingForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('editIndex').value;
    const updatedBooking = {
        customer_name: document.getElementById('editFullName').value,
        email: document.getElementById('editEmail').value,
        pickup_location: document.getElement('editPickupLocation').value,
        pickup_date: document.getElement('editPickupDate').value,
        return_date: document.getElement('editReturnDate').value
    };

    try {
        await updateBooking(id, updatedBooking);
        $('#editBookingModal').modal('hide');
        displayBookings();
        alert('Booking updated successfully!');
    } catch (error) {
        console.error('Error updating booking:', error);
    }
});

// Delete 
async function deleteBooking(id) {
    try {
        await removeBookingFromBackend(id);
        displayBookings();
        alert('Booking canceled successfully!');
    } catch (error) {
        console.error('Error deleting booking:', error);
    }
}

// Booking form 
document.getElementById('bookingForm')?.addEventListener('submit', async function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const pickupLocation = document.getElementById('pickupLocation').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const returnDate = document.getElementById('returnDate').value;

    const newBooking = { customer_name: fullName, email, pickup_location: pickupLocation, pickup_date: pickupDate, return_date: returnDate };
    
    try {
        await createBooking(newBooking);
        alert('Booking Confirmed!');
        window.location.href = 'bookings.html';//redirected 
    } catch (error) {
        console.error('Error creating booking:', error);
    }
});


window.onload = displayBookings;
