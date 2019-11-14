import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {


  private usuarios;
  private error : boolean;
  private mensajeError : string;
  private cargando : boolean;

  constructor(private servicioUsuarios : UsuariosService, private router : Router) { }

  ngOnInit() {
    this.cargando = true;
    this.error = false;
    this.servicioUsuarios.getUsuarios().subscribe(
      (respuesta)=>{
        this.cargando = false;
        this.usuarios = respuesta["filas"]
      },
      (error)=>{
        this.cargando = false;
        this.error = true;
        this.mensajeError = error ['error']['mensaje'];
      }
    )
    this.servicioUsuarios.sesionCerrada.subscribe(
      (id) =>{
        this.router.navigate(["/"]);
      }
    )
  }

}
