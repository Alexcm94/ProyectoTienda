import { Component, OnInit, RootRenderer } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servicioUsuarios : UsuariosService, private router : Router) { }
  private errores = [];
  ngOnInit() {
  }
  public login(correo_electronico : String, contrasena : String){
    //COMPROBAR LOGIN...
    this.errores = []; 
    this.servicioUsuarios.iniciarSesion(correo_electronico, contrasena).subscribe(
      (respuesta)=>{
        let usuario = respuesta["usuario"]
        this.servicioUsuarios.anunciarSesion(usuario);
      this.router.navigate(["/"]);
      },
      (error) => {
        this.errores.push(error["error"]["mensaje"]);
      }
    )
  }
}
