import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiendaRopa';
  

  constructor(private servicioUsuarios : UsuariosService){ }
  ngOnInit(){
    let idUsuario = this.servicioUsuarios.id_usuario();
    if (idUsuario != 0){
      this.servicioUsuarios.getUsuario(idUsuario).subscribe(
        (respuesta) =>{
          let usuario = respuesta["usuario"]
          this.servicioUsuarios.anunciarSesion(usuario);
        },
        (error) =>{
          this.servicioUsuarios.cerrarSesion();
          console.log(error["error"]["mensaje"]);
        }
      )
      
    }
  }
}
