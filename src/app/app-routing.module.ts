import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';


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
    path: "login",
    component: LoginComponent
  }
  ,
  {
    path: "usuarios",
    component: ListaUsuariosComponent
  }
  ,
  {
    path: "registrar_productos",
    component: RegistrarProductoComponent
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
