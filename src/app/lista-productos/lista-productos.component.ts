import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { UsuariosService } from '../services/usuarios.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  constructor(private servicioProductos : ProductosService, public servicioUsuarios : UsuariosService, public servicioCarrito : CarritoService) { }
  //@ViewChild('cantidad') inputCantidad;
  public productos = [];
  public error : boolean;
  public error_mensaje : string;
  public cargando : boolean;
  ngOnInit() {
    this.cargando=true;
    this.error = false;
    this.servicioProductos.getProductos().subscribe(
      (respuesta) => {
        this.cargando = false;
        this.productos = respuesta["filas"];
      },
      (error) => {
        this.cargando = false;
        this.error = true;
        this.error_mensaje = error["error"]["mensaje"];
        if(!this.error_mensaje){
          this.error_mensaje = "El servidor no está disponible";
        }
      }
    );
  }


}
