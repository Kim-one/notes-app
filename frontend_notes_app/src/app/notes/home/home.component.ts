import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotescardComponent } from '../notescard/notescard.component';

// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Notes } from '../notes';
// import { Observable } from 'rxjs';
import { NotesService } from '../notes.service';
import { Notes } from '../notes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule,NotescardComponent],
  // template:`<div></div>`,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // data:any={};
  searchText='';
  constructor(private router:Router, private notesService:NotesService){}

  notes:Notes[]=[];

  newNote: Notes={
    noteId:0,
    title:'',
    content:''
  }

  ngOnInit(): void {}

  display(){
    // console.log("hello");
    this.router.navigateByUrl("notes/display");
  }

  onSearch(){
    this.notesService.updateSearchQuery(this.searchText);
  }
}
