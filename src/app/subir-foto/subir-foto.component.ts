import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.css']
})
export class SubirFotoComponent implements OnInit {

  public formulario : FormGroup;

  constructor(public formBuilder : FormBuilder, private servicioSubidas : UploadService) { 
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      imagen: ['']
    });
  }

  public ficheroSeleccionado(evento) {
    if (evento.target.files.length > 0) {
      const fichero = evento.target.files[0];
      this.formulario.get('imagen').setValue(fichero);
    }
  }

  public formularioEnviado() {
    const datos = new FormData();
    datos.append('imagen', this.formulario.get('imagen').value);
    this.servicioSubidas.subirImagen(datos).subscribe(
      (respuesta) => {
        alert('Imagen subida');
      },
      (error) => {
        alert('Imagen no subida');
      }
    )
  }

}
