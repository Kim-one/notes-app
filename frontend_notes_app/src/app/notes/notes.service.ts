import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notes } from './notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private _httpClient: HttpClient) { }
  private searchQuery = new BehaviorSubject<string>(''); // stores search query
  currentQuery = this.searchQuery.asObservable();

  baseUrl: string="http://localhost:3300/notes/";
  // fetchAllNotes(){
  //   return this._httpClient.get(this.baseUrl);
  // }

  fetchAllNotes():Observable<Notes[]>{
    return this._httpClient.get<Notes[]>(this.baseUrl);
    // return this._httpClient.get<Notes[]>(`${this.baseUrl}`);
  }

  updateSearchQuery(query:string){
    this.searchQuery.next(query);
  }

  fetchquerynotes(query:string):Observable<Notes[]>{
    return this._httpClient.get<Notes[]>(`${this.baseUrl}/search?q=${query}`);
  }

  fetchByID(noteId: Number):Observable<Notes>{
    return this._httpClient.get<Notes>(`${this.baseUrl}/${noteId}`);
  }

  createNotes(data:Notes){
    return this._httpClient.post<Notes>(`${this.baseUrl}/add-note`,data);
  }

  editNotes(noteId:Number, data:Notes){
    return this._httpClient.put<Notes>(`${this.baseUrl}/${noteId}`,data);
  }

  deleteNote(noteId:Number){
    return this._httpClient.delete<Notes>(`${this.baseUrl}/${noteId}`);
  }
}
