const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Get All the notes using get  "/api/auth/getuser" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})


// Route 2: Add Notes using post  "/api/auth/addnotes" login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter  a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If there are some error,return bad request and the error with express validator package
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNotes = await note.save()
        res.json(savedNotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
    }
})
// Route 3: Update Notes using put "/api/auth/updatenote" login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create a new object
    try {

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated and update it

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Finally update:-

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


// Route 4: Delete Notes using delete "/api/auth/deletenote" login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {

        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed To Delete");
        }

        // Finally delete:-
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Sucess": "Note has been successfully deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

module.exports = router
