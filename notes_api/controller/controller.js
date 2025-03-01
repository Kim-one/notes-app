const express = require('express');
const mongoose = require('mongoose');
const Notes = require('../model/notes');
const router = express.Router();

//get
router.get("/", async (req, res) => {
    try {
        const notes = await Notes.find({});
        res.send(notes);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//post
router.post("/add-note", (req, res) => {
    const note = new Notes({
        // id: 0,
        title: req.body.title,
        content: req.body.content,
    });

    note.save()
        .then(result => {
            res.json(result);
        }).catch(e => {
            res.json(e);
        });
});

//delete
router.delete("/:noteId", async (req, res) => {
    try {
        const id = Number(req.params.noteId);
        const query = { noteId: id }
        const notesObj = await Notes.deleteOne(query, req.body)
        res.json(notesObj);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

//update
router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const notesObj = await Notes.updateOne({ noteId: id }, { $set: { title: req.body.title, content: req.body.content }, new: true });
        res.json(notesObj);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// search based on query 
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: "search query is required." });
        }

        const notes = await Notes.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } }
            ]
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

//get one note by noteId
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const notes = await Notes.find({ noteId: id });
        res.json(notes);
    } catch (err) {
        res.json(err);
    }
});



module.exports = router;