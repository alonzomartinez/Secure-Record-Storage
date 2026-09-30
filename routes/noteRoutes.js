const router = require('express').Router();
const Note = require('../models/note');
const { authMiddleware } = require('../utils/auth');

// Require users to be logged in before accessing notes.
router.use(authMiddleware);

// GET /api/notes - Get only the logged-in user's notes.
router.get('/', async (req, res) => {
  try {
    // Only find notes owned by the logged-in user.
    const notes = await Note.find({ user: req.user._id });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Could not get notes.' });
  }
});

// POST /api/notes - Create a new note.
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Save the new note with the logged-in user's ID.
    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: 'Could not create note.' });
  }
});

// GET /api/notes/:id - Get one note owned by the logged-in user.
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    // Make sure the logged-in user owns this note.
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'User is not authorized to view this note.',
      });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Could not get note.' });
  }
});

// PUT /api/notes/:id - Update a note.
router.put('/:id', async (req, res) => {
  try {
    // Find the note before trying to update it.
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    // Only the owner can update the note.
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'User is not authorized to update this note.',
      });
    }

    // Update only the title and content.
    if (req.body.title !== undefined) {
      note.title = req.body.title;
    }

    if (req.body.content !== undefined) {
      note.content = req.body.content;
    }

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(400).json({ message: 'Could not update note.' });
  }
});

// DELETE /api/notes/:id - Delete a note.
router.delete('/:id', async (req, res) => {
  try {
    // Find the note before trying to delete it.
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    // Only the owner can delete the note.
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'User is not authorized to delete this note.',
      });
    }

    await note.deleteOne();

    res.json({ message: 'Note deleted successfully.' });
  } catch (err) {
    res.status(400).json({ message: 'Could not delete note.' });
  }
});

module.exports = router;