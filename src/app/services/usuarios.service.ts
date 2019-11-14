import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient, private serviceCookies : CookieService) { }
  
  //private baseURL : string = "http://127.0.0.1/api/usuarios"
  private baseURL : string = "https://gestionapisclases.es/api2/usuarios";
  //Evitamos error Cross-Origin
  private opcionesHttp = {
    headers: new HttpHeaders(
      {
        "Content-Type" : "text/plain"
      }
    )
  }
  private usuario;

  @Output() sesionIniciada : EventEmitter<number> = new EventEmitter<number>();
  @Output() sesionCerrada : EventEmitter<number> = new EventEmitter<number>();

  public actualizarUsuarioActual(usuario){
    this.usuario = usuario;
  }
  public getUsuarios() : Observable<any>{
    return this.http.get(this.baseURL + '/todos.php');
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
    return this.http.post(this.baseURL + '/insertar.php', datos, this.opcionesHttp);
  }

  public iniciarSesion(correo_electronico, contrasena):Observable<any>{
    let login = {
      correo_electronico : correo_electronico,
      contrasena : contrasena
    };
    let datos : String = JSON.stringify({login : login});
    return this.http.post(this.baseURL + '/iniciarSesion.php', datos, this.opcionesHttp);
  }

  public anunciarSesion(usuario){
    this.actualizarUsuarioActual(usuario);
    this.serviceCookies.set("sesion", usuario.id);
    this.sesionIniciada.emit(usuario.id);
  }
  public getUsuario(idUsuario : Number) : Observable<any>{
    let params = new HttpParams().set("id", ""+idUsuario)
    // Le metemos params para enviar la id del usuario que queremos conseguir
    return this.http.get(this.baseURL + "/obtenerUsuario.php", {params : params})
  }
  public haySesionIniciada(){
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

 
}
