import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tareaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'Titulo obligatorio']
    },
    descripcion: String,
    usuarioID: String,
    date: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    }
});

// Convirtiendo a modelo
const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea;