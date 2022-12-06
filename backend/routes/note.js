const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Fetch all the notes using get '/api/notes/fetchallnode' login required
router.get('/fetchallnode', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }) 
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error")
    }
})

//Add notes using post '/api/notes/addnote' login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save();
        res.json([saveNote])
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error")
    }

})

//Update Existing notes using put '/api/notes//updatenote/:id' login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const newNote ={};
        if(title){newNote.title =title};
        if(description){newNote.description =description};
        if(tag){newNote.tag =tag};

        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Note allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error")
    }
})

//Delete Existing notes using Delete '/api/notes//deletenote/:id' login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")}
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Note allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted" , note: note})
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Internal Server Error")
    }
})

// //Create user profile using get request '/api/notes/userprofile' login required
// router.get('/userprofile', fetchuser, async (req, res) => {
//     try {
//         const notes = await Note.find({ user: req.user.id }) 
//         res.json(notes)
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json("Internal Server Error")
//     }
// })


module.exports = router