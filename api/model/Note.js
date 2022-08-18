const { default: mongoose } = require("mongoose")

const {model, Schema} = mongoose

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Note = model('Note', noteSchema)

const note = new Note({
    content: 'Hola Tobi',
    date: new Date(),
    important: true
})

note.save()
    .then(result => {
        console.log(result);
        mongoose.connection.close()
    })
    .catch(err => {
        console.log(err);
    })

    module.exports = Note