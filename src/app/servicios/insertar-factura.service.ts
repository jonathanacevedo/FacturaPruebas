import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InsertarFacturaService {

  private url = "localhost:8082/factura";

  constructor(public http: HttpClient) { }


  registrarFactura(body: string): any{

    return this.http.post(this.url, JSON.parse(body));
  }
}
