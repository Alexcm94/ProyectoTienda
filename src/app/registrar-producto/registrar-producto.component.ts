import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  public errores = [];
  public cargando : boolean;
  public formulario : FormGroup;

  constructor(private servicioProducto : ProductosService, private router : Router, public formBuilder : FormBuilder,) { }

  ngOnInit() {
    this.cargando = false;
    this.formulario = this.formBuilder.group({
      imagen: ['']
    });
  }

  public ficheroSeleccionado(evento) {
    if (evento.target.files.length > 0) {
      const fichero = evento.target.files[0];
      this.formulario.get('imagen').setValue(fichero);
    }
  }

  public registrar(nombre : string, tipo : string, subtipo : string, descripcion : string, precio : number, descuento : number){
    
    this.cargando = true;
    this.errores = [];
    if(nombre == ""){
      this.errores.push("El nombre no puede estar vacio");
    }
    if(tipo == ""){
      this.errores.push("Los apellidos no pueden estar en blanco");
    }
    
    if(this.errores.length == 0){
      const datos = new FormData();
      const producto = {
        nombre: nombre,
        tipo: tipo,
        subtipo: subtipo,
        descripcion: descripcion,
        precio: precio,
        descuento: descuento
      }
      datos.append('imagen', this.formulario.get('imagen').value);
      datos.append('producto', JSON.stringify(producto));
      this.servicioProducto.registrarProducto(datos).subscribe(
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
