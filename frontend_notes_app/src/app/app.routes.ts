import { Routes } from '@angular/router';
import { HomeComponent } from './notes/home/home.component';
import { NoteDetailsComponent } from './notes/note-details/note-details.component';

export const routes: Routes = [
    {path:"notes/home",component:HomeComponent},
    {path:"notes/display", component: NoteDetailsComponent},
    {path:"notes/display/:id", component:NoteDetailsComponent},
    {path:"",redirectTo:"notes/home",pathMatch:"full"}
];
