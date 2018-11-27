import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InsertarFacturaService {

  private url = "localhost:8082/factura";

  constructor(public http: HttpClient) { }


  registrarFactura(body: string): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(this.url, JSON.parse(body), httpOptions);
  }
}
