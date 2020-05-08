import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductosService } from '../services/productos.service';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public cargando : boolean;
public errores = [];
public iconoBusqueda = faSearch;
public productos = [];
@ViewChild("f", null) formulario : NgForm;
constructor(private servicioProductos : ProductosService, private router : Router) { }

ngOnInit() {
}
public enviarFormulario(){
  this.cargando = true; 
  this.errores = [];
  let searchPalabra = this.formulario.value.searchPalabra;
  if(searchPalabra != ""){
    this.servicioProductos.buscarPalabra(searchPalabra).subscribe(
      (respuesta) => {
        this.cargando = false;
        this.productos = respuesta;
      },
      (error) => {
        this.cargando = false;
        this.errores.push("En este momento no se encuentran productos disponibles de ese tipo. Pruebe otra búsqueda.");
      }
    )
    
  }else{
    this.errores.push("No ha ingresado ninguna palabra para buscar. Pruebe de nuevo.");
  }
}
}
