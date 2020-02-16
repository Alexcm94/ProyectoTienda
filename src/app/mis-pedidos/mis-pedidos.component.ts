import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';

@Component({
  selector: ' app-mis-pedidos ',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: [ './mis-pedidos.component.css' ]
})
export class MisPedidosComponent implements OnInit {

  public pedidos = [];

  constructor( private servicioPedidos : PedidosService ) { }

  ngOnInit() {
    this.pedidos = this.servicioPedidos.getMisPedidos();
  }

}
