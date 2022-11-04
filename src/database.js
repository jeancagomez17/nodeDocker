const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:root@clusterprueba.v1lkh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
.then(data => console.log('Conectado a la base de datos'))

module.exports = mongoose