import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios = [
    {
      nombre: "Juan Antonio",
      apellidos: "Jimenez",
      correo:"juanan@gmail.com",
      direccion:"Camino Ronda, 184",
      telefono:"678567654",
      contrasena:"juanan123"
    },
    {
      nombre: "Fernando",
      apellidos: "Fernandez",
      correo:"fernandito@gmail.com",
      direccion:"Camino de Huetor, 14",
      telefono:"678567434",
      contrasena:"fer123"
    }
  ]

  public getUsuarios() {
    return this.usuarios;
  }

  public registrarUsuario(nombre : string, apellidos : string, correo : string, direccion : string, telefono : string, contrasena : string){
    let usuario = {
      nombre: nombre,
      apellidos: apellidos,
      correo: correo,
      direccion: direccion,
      telefono: telefono,
      contrasena: contrasena
    }
    this.usuarios.push(usuario)
  }

  constructor() { }
}
