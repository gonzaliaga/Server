require('dotenv').config()
const express = require('express'),
    mongoose = require('mongoose'),
    routes = require('./src/routes/index')
const app = express()
const cors = require('cors')

const corsOptions = {
    origin: '*', //Reemplaza esto con el dominio permitido
    methods: 'GET, PUT, POST, DELETE',
    credentials: true, //Permite el envio de cookies o credenciales
    optionSuccessStatus: 204, //Configura el codigo de respuiesta para las solicitudes OPTION
};

app.use(cors(corsOptions))
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

app.use('/v1', routes)

app.post('/', (req, res) => {
    res.json({
        massage:'Se creo un elemento'
    })
})

app.get('/', (req, res) => {
    res.json({
        massage:'Se obtuvo un elemento'
    })
})

app.put('/', (req, res) => {
    res.json({
        massage:'Se actualizó un elemento'
    })
})

app.delete('/', (req, res) => {
    res.json({
        massage:'Se eliminó un elemento'
    })
})

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado en el puerto' + process.env.PORT);
})

//localhost:3000/v1/users