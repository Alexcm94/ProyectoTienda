import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  public errores = [];
  public cargando : boolean;

  constructor(private servicioProducto : ProductosService, private router : Router) { }

  ngOnInit() {
    this.cargando = false;
  }

  public registrar(nombre : string, tipo : string, subtipo : string, descripcion : string, imagen : string, precio : number, descuento : number){
    
    this.cargando = true;
    this.errores = [];
    if(nombre == ""){
      this.errores.push("El nombre no puede estar vacio");
    }
    if(tipo == ""){
      this.errores.push("Los apellidos no pueden estar en blanco");
    }
    
    if(this.errores.length == 0){
      this.servicioProducto.registrarProducto(nombre, tipo, subtipo, descripcion, imagen, precio, descuento).subscribe(
        (respuesta)=>{
          this.cargando = false;
          let producto : any;
          producto = respuesta["producto"];
          this.router.navigate(["/productos"]);
        },
        (error) => {
        this.cargando = false;
        let error_mensaje = error["error"]["mensaje"];
        if(!error_mensaje){
          error_mensaje = "El servidor no está disponible";
        }
        this.errores.push(error_mensaje);
        }
      );
     
    }
    
  }
  }

//}
