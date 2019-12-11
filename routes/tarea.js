import express from 'express';
const router = express.Router();

// Importar el modelo de tarea
import Tarea from '../models/tarea';

// Ruta POST para agregar una nota a la BD
router.post('/agregar', async(req, res) => {
    const body = req.body;
    console.log('Agregando Tarea');
    try {
        const tareaDB = await Tarea.create(body);
        res.status(200).json(tareaDB);
        console.log(`Nota creada ${tareaDB}`);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al crear la tarea',
            error
        });
    }
});

// Rutas GET para obtener datos de la BD
// Get con parametro ID
router.get('/tarea/:id', async(req, res) => {
    const _id = req.params.id;
    console.log('Obteniendo por ID');
    try {
        const tareaDB = await Tarea.findOne({ _id });
        res.status(200).json(tareaDB);
        console.log(`Nota encontrada ${tareaDB}`);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'No se encontro la tarea',
            error
        });
    }
});

// Get todas las tereas de la DB
router.get('/tareas', async(req, res) => {
    try {
        const tareasDb = await Tarea.find();
        res.json(tareasDb);
        console.log(tareasDb);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'No hay tareas guardadas',
            error
        });
    }
});

// Ruta DELETE para eliminar una tarea
router.delete('/tarea/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const tareaEliminada = await Tarea.findOneAndDelete({ _id });
        if (!tareaEliminada) {
            return res.status(400).json({
                mensaje: 'No se encontro la nota',
                error
            });
        }
        res.status(200).json(tareaEliminada);
        console.log(tareaEliminada);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al eliminar tarea',
            error
        });
    }
});

// Ruta PUT para editar tarea
router.put('/tarea/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const tareaDB = await Tarea.findByIdAndUpdate(_id, body, { new: true });
        res.status(200).json(tareaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al modificar la nota',
            error
        });
    }
});

// Ruta PUT para cambiar una tarea a realizada
router.put('/tareaRealizada/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const tareaDB = await Tarea.findByIdAndUpdate(_id, { estado: false }, { new: true });
        res.status(200).json(tareaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al modificar la nota',
            error
        });
    }
});

// Ruta PUT para cambiar una tarea a realizada
router.put('/tareaPorRealizar/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const tareaDB = await Tarea.findByIdAndUpdate(_id, { estado: true }, { new: true });
        res.status(200).json(tareaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error al modificar la nota',
            error
        });
    }
});


module.exports = router;