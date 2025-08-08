const express = require('express');
const router = express.Router();
const note = require('../models/note');

//GET
router.get('/', async (req, res) => {
    try {
        const notes = await note.find();
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST
router.post('/', async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({ message: 'Title and body are required' });
    }

    try {
        const newNote = new note({ title, body });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//UPDATE
router.put('/:id', async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({ message: 'Title and body are required' });
    }

    try {
        const updatedNote = await note.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(updatedNote);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await note.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;