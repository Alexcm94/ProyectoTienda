import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  { 
    path: "home", 
    component: HomeComponent
  }
  ,
  { 
    path: "registro", 
    component: RegistroComponent
  }
  ,
  { 
    path: "", 
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
