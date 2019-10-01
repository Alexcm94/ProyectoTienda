import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private usuarios;

  constructor(private servicioUsuarios : UsuariosService) { }

  ngOnInit() {
    this.usuarios = this.servicioUsuarios.getUsuarios();
  }

}
