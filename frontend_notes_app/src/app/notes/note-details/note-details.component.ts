import {  Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notes } from '../notes';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-details',
  imports: [MatFormFieldModule, CommonModule, FormsModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})

export class NoteDetailsComponent implements OnInit {
  constructor(private router:Router, private notesService: NotesService){}
  note:Notes={
    noteId:0,
    title:'',
    content:''
  }
  ngOnInit(): void {
    //if the url does not end with "display" then populate the form with with the notes of the 
    //selected id number
    if(!this.router.url.endsWith('display')){
      //get the note id from the url 
      const url = this.router.url;
      const seg = url.split('/').filter(segment => segment);
      const noteId = Number(seg[seg.length-1]);
      //get title and content from server based on noteID
      this.notesService.fetchByID(noteId).subscribe((response: any)=>{
        console.log(response); // response was an array
        if(response.length > 0){ //if array has atleast 1 element then 
          const getNotes = response[0]; // get notes at elemen 0
          console.log(getNotes.title); //prints title of element at the given note id
          //assigns note title and content  
          this.note.title = getNotes.title; 
          this.note.content = getNotes.content;
        }
      },
      (error)=>{
        console.log("Error",error);
      });
    }else{
      this.note.title = ""
      this.note.content = ""
    }
  }

  addNote(){
    this.notesService.createNotes(this.note).subscribe((response)=>{
      console.log("Notes created! ", response);
      this.notesService.fetchAllNotes().subscribe((notes)=>{
        console.log("Fetched notes: ", notes)
      });
      window.location.reload();
    },
    (error)=>{
      console.error(error);
    }
  );
    console.log("Saved!!!!");
  }

  updateNote(){
    const url = this.router.url;
    const seg = url.split('/').filter(segment => segment);
    const noteId = Number(seg[seg.length-1]);
    // console.log("Updating note with ID: ", noteId);

    this.notesService.editNotes(noteId,this.note).subscribe((response)=>{
      console.log("Note updated!!",response);
      this.notesService.fetchAllNotes().subscribe((notes)=>{
        console.log("Fetched notes after update: ", notes)
      });
      window.location.reload();
    },
    (error)=>{
      console.log("ID not found!");
      // this.addNote();
    });
  }

  submit(){
    if(this.router.url.endsWith('display')){
      console.log("Adding new note!!");
      this.addNote();
    } else {
      // console.log("Updating note with note ID: ", noteId);
      this.updateNote();
    }
    this.router.navigateByUrl("notes/home");
  }


  cancel(){
    this.router.navigateByUrl("notes/home");
  }
}
