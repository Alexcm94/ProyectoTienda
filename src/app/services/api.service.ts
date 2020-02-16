import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public baseURL = "http://127.0.0.1/api"
  public baseURL ="https://gestionapisclases.es/api2"
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
  public post(url, datos) : Observable<any>{
    return this.http.post(url, datos, this.opcionesHttp);
  }
}
 