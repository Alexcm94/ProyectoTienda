import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { CarritoService } from '../services/carrito.service';
import { NgForm } from '@angular/forms';
import { PedidosService } from '../services/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.component.html',
  styleUrls: ['./realizar-pedido.component.css']
})
export class RealizarPedidoComponent implements OnInit {
  public usuario;
  public lineasPedido = [];
  public cargando : boolean;
  public errores = [];
  public precioEnvio = 5;

  @ViewChild("f", null) formulario : NgForm;

  constructor(private servicioUsuarios : UsuariosService, private servicioCarrito : CarritoService, private servicioPedidos: PedidosService, private router : Router) { }

  ngOnInit() {
    this.usuario = this.servicioUsuarios.usuarioActual();
    this.errores = [];
    this.cargando = true; 
    this.servicioCarrito.getProductos().subscribe(
      (respuesta) => {
        this.cargando = false;
        this.lineasPedido = respuesta['filas'];
      },
      (error) => {
        this.cargando = false;
        let mensaje_error = error["error"]["mensaje"];
        if(mensaje_error==""){
          mensaje_error = "El servidor no se encuentra disponible";
        }
        this.errores.push(mensaje_error);
      }
    )
  }

  public precioTotal(){
    let precio = 0;
    for (let i = 0; i < this.lineasPedido.length; i++) {
      const linea = this.lineasPedido[i];
      precio += linea.precio * linea.cantidad;
    }
    precio += this.precioEnvio;
    return precio;
  }

  public enviarFormulario(){
    this.errores = [];
    let tipoTarjeta = this.formulario.value.tipo_tarjeta;
    let numTarjeta = this.formulario.value.numero_tarjeta;
    let cvv = this.formulario.value.cvv;
    let fecha = this.formulario.value.expiracion_tarjeta;

    if(numTarjeta == "") {
      this.errores.push("El numero de tarjeta no puedo estar vacío.");
    }
    if(cvv == "") {
      this.errores.push("El CVV no puede estar vacío.");
    }
    if(fecha == ""){
      this.errores.push("La fecha no puede estar vacía.");
    }
    if(this.errores.length == 0){
      this.servicioPedidos.realizarPedido().subscribe(
        (respuesta) => {
          this.servicioCarrito.anunciarCantidadCambiada(0);
          this.router.navigate(["/"]);
        },
        (error) => {
          this.errores.push("No se pudo completar el pedido");
        }
      )
    }
  }

}
