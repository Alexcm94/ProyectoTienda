import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errores = [];

  constructor(private servicioUsuarios : UsuariosService, private router : Router) { }

  ngOnInit() {
  }

  public registrar(nombre : string, apellidos : string, correo : string, direccion : string, telefono : string, contrasena : string){
    this.errores = [];
    if(nombre == ""){
      this.errores.push("El nombre no puede estar vacio");
    }
    if(apellidos == ""){
      this.errores.push("Los apellidos no pueden estar en blanco");
    }
    if(this.errores.length == 0){
      this.servicioUsuarios.registrarUsuario(nombre, apellidos, correo, direccion, telefono, contrasena);
      this.router.navigate(["/home"]);
    }
    
  }

}
