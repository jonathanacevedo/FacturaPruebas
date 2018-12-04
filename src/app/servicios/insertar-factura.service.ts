import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InsertarFacturaService {

  private urlInsertarFactura = "http://localhost:8082/factura";
  private urlObtenerProducto = "http://localhost:8082/productos?id=";

  constructor(public http: HttpClient) { }


  registrarFactura(body: string): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(this.urlInsertarFactura, JSON.parse(body), httpOptions);
  }


  obtenerProducto(idProducto: string): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.get(this.urlObtenerProducto+idProducto, httpOptions);
  }



}
