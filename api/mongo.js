const mongoose = require('mongoose')
const {model, Schema} = mongoose

const connectionString = process.env.MONGO_DB_URI


// conexion a MongoDB

mongoose.connect(connectionString, {
    // useNewUrlParser: true,
    // useUnifiedTechnology: true,
    // useFinaAndModify: false,
    // useCreateIndex: true
})
.then(() => {
    console.log('database connected');
}). catch(err => {
    console.log(err);
})


