const mongoose = require('mongoose');


const URI = process.env.MONGOOSE_URI
    ? process.env.MONGOOSE_URI
    : 'mongodb://localhost/bingoapp';

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database is connected');
});