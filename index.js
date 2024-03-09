const mongoose = require('mongoose');
const app = require('./src/config/express');
const port = 3000;

//connect to mongodb
mongoose.connect('mongodb+srv://exam-portal:ZYMQPEeCiEwxY8mN@cluster0.ccvsmck.mongodb.net/exam-portal-dev');
mongoose.connection.on('connected', () => {
    console.log('Mongoose Connected');
});
mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to db',err);
});

app.listen(port, () => {
    console.log(`Server active on port- ${port}`)
});
    
    


