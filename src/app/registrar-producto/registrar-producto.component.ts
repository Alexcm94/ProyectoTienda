import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  public errores = [];
  public cargando : boolean;

  constructor(private servicioProducto : ProductosService) { }

  ngOnInit() {
  }

  public registrar(){}

}
