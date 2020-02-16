import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CarritoComponent } from 'src/app/carrito/carrito.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  @Input() producto;
  public error : boolean;
  public error_mensaje : string;
  public cargando : boolean;
  @ViewChild('formulario', null) formulario : NgForm;
  

  constructor(public servicioUsuarios : UsuariosService, public servicioCarrito : CarritoService) { }

  ngOnInit() {
    this.cargando = false;
  }

  public enviarFormulario(){
    
    this.error = false;
    if(this.formulario.value.cantidad < 1){
      this.error = true;
      this.error_mensaje = "No se ha seleccionado producto."
    }
    if(this.error==false){
      this.cargando = true;
      this.servicioCarrito.agregarAlCarrito(this.producto.id, this.formulario.value.cantidad).subscribe(
        (respuesta)=>{
          this.cargando = false;
          let cantidad = respuesta["cantidad"];
          this.servicioCarrito.anunciarCantidadCambiada(cantidad);
          this.formulario.controls.cantidad.setValue(1);
        },
        (error) => {
          this.cargando = false;;
          this.error = true;
          this.error_mensaje = error["error"]["mensaje"];
          if(this.error_mensaje==""){
            this.error_mensaje = "El servidor no está disponible";
          }
        }
      )
      
    }
  }

}