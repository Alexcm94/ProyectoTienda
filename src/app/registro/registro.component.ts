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
  public cargando : boolean;
  public correo_cortado : Array<string>;
  
  constructor(private servicioUsuarios : UsuariosService, private router : Router) { }

  ngOnInit() {
    this.cargando = false;
  }

  public registrar(nombre : string, apellidos : string, correo : string, direccion : string, telefono : string, contrasena : string){
    this.cargando = true;
    this.errores = [];
    if(nombre == ""){
      this.errores.push("El nombre no puede estar vacio");
    }
    if(apellidos == ""){
      this.errores.push("Los apellidos no pueden estar en blanco");
    }
    this.correo_cortado = correo.split("@");
    if(this.correo_cortado.length == 2){
        if (this.correo_cortado[1].length > 1){
        this.correo_cortado = this.correo_cortado[1].split(".");
        console.log("antes punto " + this.correo_cortado[0]);
        console.log("despues punto " + this.correo_cortado[1]);
        console.log("tamaño " + this.correo_cortado[1].length);
        console.log("tamaño t " + this.correo_cortado.length)
        if (this.correo_cortado[1] != ""){
          if(this.correo_cortado.length != 2 ){
              this.errores.push("El correo no es válido");
            }
          }else{
            this.errores.push("El correo no es válido");
          }
        }
      }else{
        this.errores.push("El correo no es válido");
      }
    if(this.errores.length == 0){
      this.servicioUsuarios.registrarUsuario(nombre, apellidos, correo, direccion, telefono, contrasena).subscribe(
        (respuesta) => {
          this.cargando = false;
          this.router.navigate(["/home"]);
        },
        (error) => {
          this.cargando = false;
          this.errores.push(error["error"]["mensaje"]);
        }
        )
      
    }
    
  }

}
