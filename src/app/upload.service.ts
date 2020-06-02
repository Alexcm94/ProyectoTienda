import { Injectable } from '@angular/core';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService  extends ApiService {

  constructor(http: HttpClient) {
    super(http);
    this.baseURL= this.baseURL + "/imagenes";  
  }

  public subirImagen(datos) {
    // pasamos el tercer parametro a true para indicar que es un fichero
    return this.post(this.baseURL + '/subir.php', datos, true);
  }
}
