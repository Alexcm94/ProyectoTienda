import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public baseURL = "http://127.0.0.1/api"
  public baseURL ="https://acmtienda.es"
  private opcionesHttp = {
    headers: new HttpHeaders(
      {
        "Content-Type" : "text/plain"
      }
    )
  }
  constructor(private http: HttpClient) { }
  public get(url : string) : Observable<any>{
    return this.http.get(url);
  }
  public getConParametros(url, parametros) : Observable<any>{
    return this.http.get(url, parametros);
  }

  // Por defecto, no enviamos un fichero, por lo que si no se pasa el tercer parametro
  // se da por hecho que es falso
  public post(url, datos, fichero = false) : Observable<any>{
    if(fichero) {
      return this.http.post(url, datos);
    }
    else {
      return this.http.post(url, datos, this.opcionesHttp);
    }
    
  }
}
 