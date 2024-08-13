const mongoose = require('mongoose');
const manageUser = require('../models/manageUser'); // Update with the correct path

async function testUserCreation() {
    const user = new manageUser({
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        type: 'Student'
    });

    try {
        const newUser = await user.save();
        console.log('User saved:', user);
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

mongoose.connect('mongodb+srv://rameshramesh997:pOvTd7wdSaMTdaUP@cluster0.r2ztkdl.mongodb.net/HappyPlum?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        testUserCreation().then(() => mongoose.disconnect());
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });
