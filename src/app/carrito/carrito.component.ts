import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from '../services/usuarios.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  //@Input() producto;
  public productos = [];
  public error : boolean;
  public error_mensaje : string;
  constructor(public servicioCarrito : CarritoService, public servicioUsuario : UsuariosService) { }
  
  ngOnInit() {
    this.error = false;
    this.servicioCarrito.getProductos().subscribe(
      (respuesta) => {
        this.productos = respuesta["filas"];
      },
      (error) => {
        this.error = true;
        this.error_mensaje = error["error"]["mensaje"];
        if(!this.error_mensaje){
          this.error_mensaje = "El servidor no está disponible";
        }
      }
    );
  }
  public clickBotonEliminar(id_producto) {
    this.error=false;
    this.servicioCarrito.eliminarCarrito(this.servicioUsuario.id_usuario(), id_producto).subscribe(
      (respuesta)=>{
        this.productos = respuesta;
        this.servicioCarrito.anunciarCantidadCambiada(this.productos.length);
      },
      (error)=>{
        this.error = true;
        this.error_mensaje = error["error"]["mensaje"];
        if(!this.error_mensaje){
          this.error_mensaje = "El servidor no está disponible";
        }
      }
    )
  }
}
