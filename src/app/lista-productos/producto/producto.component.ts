import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CarritoComponent } from 'src/app/carrito/carrito.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { NgForm } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  

  constructor(public servicioUsuarios : UsuariosService, public servicioCarrito : CarritoService, public servicioProductos : ProductosService) { }

  ngOnInit() {
    this.cargando = false;
  }

  public enviarFormulario(){
    
    this.error = false;
    if(this.formulario.value.cantidad < 1){
      this.error = true;
      this.error_mensaje = "No se ha seleccionado producto."
    }
    if(this.formulario.value.talla == "") {
      this.error = true;
      this.error_mensaje = "Debes seleccionar una talla";
    }
    if(this.error==false){
      this.cargando = true;
      this.servicioCarrito.agregarAlCarrito(this.producto.id, this.formulario.value.cantidad, this.formulario.value.talla).subscribe(
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

  public clickBotonEliminar() {
    this.cargando = true;
    this.error = false;
    this.servicioProductos.eliminarProducto(this.producto.id).subscribe(
      (respuesta) => {
        this.cargando = false;
        this.servicioProductos.anunciarProductosCambiados(respuesta);
      },
      (error) => {
        this.cargando = false;
        let mensaje = error["error"]["mensaje"];
        if(mensaje == "") {
          mensaje = "El servidor no se encuentra disponible";
        }
        this.error_mensaje = mensaje;
        this.error = true;
      }
    )
  }

}
