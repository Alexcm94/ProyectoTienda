import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CookieService} from 'ngx-cookie-service';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { RegistrarProductoComponent } from './registrar-producto/registrar-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ProductoComponent } from './lista-productos/producto/producto.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RealizarPedidoComponent } from './realizar-pedido/realizar-pedido.component';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos.component';
import { PedidosTotalesComponent } from './pedidos-totales/pedidos-totales.component';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { SubirFotoComponent } from './subir-foto/subir-foto.component';

  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    CabeceraComponent,
    ListaUsuariosComponent,
    RegistrarProductoComponent,
    ListaProductosComponent,
    CarritoComponent,
    ProductoComponent,
    RealizarPedidoComponent,
    MisPedidosComponent,
    PedidosTotalesComponent,
    PieDePaginaComponent,
    SubirFotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
