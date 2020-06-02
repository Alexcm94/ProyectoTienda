import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { CarritoService } from '../services/carrito.service';
import { NgForm } from '@angular/forms';
import { PedidosService } from '../services/pedidos.service';
import { Router } from '@angular/router';
import { $ } from 'protractor';

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
  public dialogoVisible;
  public dialogoPagado;

  @ViewChild("f", null) formulario : NgForm;

  constructor(private servicioUsuarios : UsuariosService, private servicioCarrito : CarritoService, private servicioPedidos: PedidosService, private router : Router) { }

  ngOnInit() {
    this.dialogoVisible = false;
    this.dialogoPagado = false;
    this.usuario = this.servicioUsuarios.usuarioActual();
    this.servicioUsuarios.sesionIniciada.subscribe(
      usuario=>{
        this.usuario = this.servicioUsuarios.usuarioActual();
      }
    )
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
    // Esperamos a que el DOM se cargue con la funcion setTimeout y mandamos los nuevos valores de las variables en html.
    setTimeout(() => {
      if(this.usuario.numero_tarjeta != '' && this.usuario.fecha_tarjeta != '' && this.usuario.cvv != '' && this.usuario.tipo_tarjeta != '' ){
        this.formulario.setValue({
          tipo_tarjeta : this.usuario.tipo_tarjeta,
          numero_tarjeta : this.usuario.numero_tarjeta,
          cvv : this.usuario.cvv,
          expiracion_tarjeta : this.usuario.fecha_tarjeta
        });
      }
    })
    
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
      // Comprobar si los datos de tarjeta son los mismos que están guardados
      const tarjetaActual = this.servicioUsuarios.datosTarjetaUsuarioActual();

      if(tipoTarjeta == tarjetaActual.tipo && numTarjeta == tarjetaActual.numero && cvv == tarjetaActual.cvv && fecha == tarjetaActual.fecha) {
        // Si son los mismos, hacemos el pedido normal
      this.realizarPedido();

      }
      else {
        // Si son distintos, le preguntamos si desea guardar los datos de su tarjeta
        this.mostrarDialogo();
         
      }
      
      
    }
  }

  public guardarTarjeta() {
    let tipoTarjeta = this.formulario.value.tipo_tarjeta;
    let numTarjeta = this.formulario.value.numero_tarjeta;
    let cvv = this.formulario.value.cvv;
    let fecha = this.formulario.value.expiracion_tarjeta;
    this.cargando = true;
          this.errores = [];
          this.servicioUsuarios.cambiarDatosTarjeta(tipoTarjeta, numTarjeta, cvv, fecha).subscribe(
            (respuesta) => {
              // Cambiar el número de tarjeta internamente
              this.servicioUsuarios.actualizarUsuarioActual(respuesta["usuario"]);
              // Hacer el pedido
              this.realizarPedido();
            },
            (error) => {
              this.cargando = false;
              this.errores.push("No se ha podido actualizar el número de tarjeta");
            }
          )
  }

  public mostrarDialogo() {
    this.dialogoVisible = true;
  }

  public ocultarDialogo() {
    this.dialogoVisible = false;
  }

  public realizarPedido() {
    this.cargando = true;
    this.errores = [];
    this.servicioPedidos.realizarPedido().subscribe(
      (respuesta) => {
        this.cargando = false;
        this.servicioCarrito.anunciarCantidadCambiada(0);
        // Abrimos el dialogo de pedido realizado
        this.dialogoPagado = true;
        // Este navigate tiene que salir cuando le demos a aceptar en el dialogo, no aqui
        
      },
      (error) => {
        this.cargando = false;
        this.errores.push("No se pudo completar el pedido");
      }
    );
  }

  public volverAHome() {
    this.router.navigate(["/"]);
  }

}
