import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RealizarPedidoComponent } from './realizar-pedido/realizar-pedido.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { PedidosTotalesComponent } from './pedidos-totales/pedidos-totales.component';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';


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
    path: "productos",
    component: ListaProductosComponent
  }
  ,
  {
    path : "carrito",
    component : CarritoComponent
  }
  ,
  {
    path : "realizar-pedido",
    component : RealizarPedidoComponent
  }
  ,
  {
    path : "mis-pedidos",
    component : MisPedidosComponent
  }
  ,
  {
    path : "todos-los-pedidos",
    component : PedidosTotalesComponent
  }
  ,
  {
    path: "subir-foto",
    component: SubirFotoComponent
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
