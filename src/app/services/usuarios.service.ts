import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends ApiService {
  constructor(http: HttpClient, private serviceCookies : CookieService) {
    super(http);
    this.baseURL= this.baseURL + "/usuarios";

   }
  
  
  private usuario;

  @Output() sesionIniciada : EventEmitter<number> = new EventEmitter<number>();
  @Output() sesionCerrada : EventEmitter<number> = new EventEmitter<number>();

  public actualizarUsuarioActual(usuario){
    this.usuario = usuario;
  }
  public getUsuarios() : Observable<any>{
    return this.get(this.baseURL + '/todos.php');
  }

  public registrarUsuario(nombre : string, apellidos : string, correo_electronico : string, direccion : string, telefono : string, contrasena : string) : Observable<any>{
    let usuario = {
      nombre: nombre,
      apellidos: apellidos,
      correo_electronico: correo_electronico,
      direccion: direccion,
      telefono: telefono,
      contrasena: contrasena
    }
    let datos : String = JSON.stringify({usuario: usuario});
    return this.post(this.baseURL + '/insertar.php', datos);
  }

  public iniciarSesion(correo_electronico, contrasena):Observable<any>{
    let login = {
      correo_electronico : correo_electronico,
      contrasena : contrasena
    };
    let datos : String = JSON.stringify({login : login});
    return this.post(this.baseURL + '/iniciarSesion.php', datos);
  }

  public anunciarSesion(usuario){
    this.actualizarUsuarioActual(usuario);
    this.serviceCookies.set("sesion", usuario.id);
    this.sesionIniciada.emit(usuario.id);
  }
  public getUsuario(idUsuario : Number) : Observable<any>{
    let params = new HttpParams().set("id", ""+idUsuario)
    // Le metemos params para enviar la id del usuario que queremos conseguir
    return this.getConParametros(this.baseURL + "/obtenerUsuario.php", {params : params})
  }
  public id_usuario(){
    if(this.serviceCookies.check("sesion")){
      return +this.serviceCookies.get("sesion");
    }else{
      return 0;
    }
  }

  public cerrarSesion(){
    this.serviceCookies.delete("sesion");
    this.sesionCerrada.emit(0);
  }
  public usuarioActual(){
    return this.usuario;
  }
  public usuarioEsAdmin(){
    if(this.usuario != null && this.usuario.id != 0){
      return +this.usuario.admin;
    }else {
      return 0;
    }
  }

  public datosTarjetaUsuarioActual() {
    return {
      tipo: this.usuario.tipo_tarjeta,
      numero: this.usuario.numero_tarjeta,
      cvv: this.usuario.cvv,
      fecha: this.usuario.fecha_tarjeta
    }
  }

  public cambiarDatosTarjeta(tipo, numero, cvv, fecha) : Observable<any>{
    let datosTarjeta = {
      tipo_tarjeta : tipo,
      numero_tarjeta : numero,
      fecha_tarjeta : fecha,
      cvv : cvv,
      id_usuario : this.usuario.id
    };
    let datos : String = JSON.stringify(datosTarjeta);
    return this.post(this.baseURL + '/cambiarTarjeta.php', datos);
  }

  public reenviarCorreo(correo_electronico){
    let params = new HttpParams().set("correo_electronico", ""+correo_electronico)
    // Le metemos params para enviar la id del usuario que queremos conseguir
    return this.getConParametros(this.baseURL + "/mandarCorreo.php", {params : params})
  }
}
