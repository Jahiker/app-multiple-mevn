import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

// Conexion a base de datos
import mongoose from 'mongoose';

// conexion local
// const uri = 'mongodb://localhost:27017/tareas';

// conexion remota
const uri = 'mongodb+srv://mevn:wB6*gdyK*KS&ZF9@cluster0-qarre.mongodb.net/mevnPrueba?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, options)
    .then(() => {
        console.log('Conectado a la BD');
    })
    .catch((err) => {
        console.log(err);
    });

//Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
// app.get('/', (req, res) => {
//     res.send('Hola Mundo!');
// });

app.use('/api', require('./routes/tarea'));

// Para Vue.Js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Servidor
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
    console.log('Escuchando en el puerto', app.get('puerto'));
});