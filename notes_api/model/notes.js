//creating model
// const express = require('express');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const notesSchema = new mongoose.Schema({
    // id: Number,
    title: String,
    content: String
});

notesSchema.plugin(AutoIncrement, { inc_field: "noteId" });

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;