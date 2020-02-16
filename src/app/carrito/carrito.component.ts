import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public productos = [];
  public error : boolean;
  public error_mensaje : string;
  constructor(public servicioCarrito : CarritoService) { }
  
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

}
