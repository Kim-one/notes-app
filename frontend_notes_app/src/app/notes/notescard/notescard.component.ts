import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { NotesService } from '../notes.service';
import { Notes } from '../notes';
import { NgForOf} from '@angular/common';
import { Router } from '@angular/router';
import { query } from 'express';

@Component({
  selector: 'app-notescard',
  imports: [NgForOf],
  templateUrl: './notescard.component.html',
  styleUrl: './notescard.component.css'
})

export class NotescardComponent implements AfterViewInit{
  constructor(private notesService: NotesService, private router:Router){}
  // @Input() search:any;
  // searchBtn:any;
  search = '';

  note:Notes={
    noteId:0,
    title:'',
    content:''
  }

  notes:Notes[]=[];
  filteredNotes:Notes[]=[];

  searchNotes(){
    if(this.search ==''){
      // this.filteredNotes=[];
      this.getNotes();
      return;
    }
    console.log("Search function");
    console.log("This was entered: ", this.search);
    this.notesService.fetchquerynotes(this.search).subscribe((data)=>{
      this.filteredNotes=data;
      console.log(this.filteredNotes);
    })
  }

  ngAfterViewInit(): void {
    // this.getNotes();
    this.notesService.currentQuery.subscribe((query)=>{
      this.search=query;
      this.searchNotes();
    });
  }

  getNotes(){
    this.notesService.fetchAllNotes().subscribe((data)=>{
      this.filteredNotes=data;
    });
  }

  deleteNotes(noteId: Number){
    console.log("Deleting note with ID: ", noteId);
    this.notesService.deleteNote(noteId).subscribe((data)=>{
      this.notes=this.notes.filter(item=>item.noteId!==noteId);
      window.location.reload();
      console.log('data deleted');
    });
  }

  editNotes(noteId:Number){
    this.router.navigateByUrl(`notes/display/${noteId}`);
    // this.populateFields(this.note);
  }

  // searchNotes(search:String){
  //   if(this.note.title === search || this.note.content === search){
  //     console.log(this.note);
  //   }
  // }
}
