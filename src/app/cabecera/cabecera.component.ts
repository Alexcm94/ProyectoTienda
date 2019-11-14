import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  private idUsuario : number;
  private admin : number;

  constructor(private servicioUsuarios : UsuariosService) { }

  ngOnInit() {
    this.idUsuario = this.servicioUsuarios.haySesionIniciada();
    this.admin = this.servicioUsuarios.usuarioEsAdmin();
    this.servicioUsuarios.sesionIniciada.subscribe(
      (usuarioId) => {
        this.idUsuario = usuarioId;
        this.admin = this.servicioUsuarios.usuarioEsAdmin();
      }
    )
    this.servicioUsuarios.sesionCerrada.subscribe(
      (usuarioId) => {
        this.idUsuario = usuarioId;
        this.admin = 0;
      }
    )
  }

  public cerrarSesion(){
    this.servicioUsuarios.cerrarSesion();
  }

  public nombreUsuario(){
    return this.servicioUsuarios.usuarioActual().nombre;
  }

}
