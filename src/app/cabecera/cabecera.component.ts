import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  public idUsuario : number;
  public admin : number;
  public numElementosCarrito : number;
  constructor(private servicioUsuarios : UsuariosService, public servicioCarrito : CarritoService) { }

  ngOnInit() {
    this.idUsuario = this.servicioUsuarios.id_usuario();
    this.admin = this.servicioUsuarios.usuarioEsAdmin();
    this.numElementosCarrito = 0;
    if(this.idUsuario != 0 ){
      this.actualizarElementosCarrito();
    }
    this.servicioUsuarios.sesionIniciada.subscribe(
      (usuarioId) => {
        this.idUsuario = usuarioId;
        this.admin = this.servicioUsuarios.usuarioEsAdmin();
        this.actualizarElementosCarrito();
      }
    )
    this.servicioUsuarios.sesionCerrada.subscribe(
      (usuarioId) => {
        this.idUsuario = usuarioId;
        this.admin = 0;
      }
    )
    this.servicioCarrito.cantidadCambiada.subscribe(
      (nuevaCantidad) => {
        this.numElementosCarrito = nuevaCantidad;
      }
    )
  }

  public cerrarSesion(){
    this.servicioUsuarios.cerrarSesion();
  }

  public nombreUsuario(){
    let usuario = this.servicioUsuarios.usuarioActual();
    if(usuario){
      return usuario.nombre;
    }else{
      return undefined;
    }
  }

  public actualizarElementosCarrito(){
    this.servicioCarrito.getProductos().subscribe(
      (respuesta)=> {
        this.numElementosCarrito = respuesta["cantidad"];
      }
    )
  }

}
