import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { InsertarFacturaService } from '../servicios/insertar-factura.service';
import swal from 'sweetalert';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(public servicio: InsertarFacturaService) { }

  public articulos = [];
  public articulosBody = [];
  public nombreEstablecimiento: any = "";
  public nit: any = "";
  public cantidad: any = "";
  public valor: any = "";
  public iva: any = "";
  public subtotal: any = "";

  public ivaPagado: number = 0;
  public totalPagar: number = 0;
  public valorPagado: number = 0;
  public cambio: number = 0;
  public ahorro: number = 0;
  
  ngOnInit() {
  }

  agregarArticulo(){
    this.articulos.push({
      "nombre": this.articulos.length,
      "valor": '',
      "iva": 0,
      "cantidad": 1,
      "subtotal": 0
    });
    console.log(this.articulos);
  }

  retirarArticulo(){
    this.articulos.pop();
  }

  validarDatos(){
    this.ivaPagado = 0;
    this.totalPagar = 0;
    this.articulos.forEach((articulo) => {
      this.ivaPagado = this.ivaPagado+((articulo.valor*articulo.cantidad*articulo.iva)/100);
      this.totalPagar = this.totalPagar+(articulo.valor*articulo.cantidad-((articulo.valor*articulo.cantidad*articulo.iva)/100));
    });
    //this.totalPagar = this.totalPagar - this.ahorro;
    this.cambio = this.valorPagado - this.totalPagar;
  }

  invocarServicio(body: string): void {
    this.servicio.registrarFactura(body).subscribe((data) => {
      console.log(data);
    });
  }



  guardar(){    

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //Enero es 0
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    this.articulos.forEach((articulo) => {
      this.articulosBody.push({
        "codigo": articulo.nombre,
        "iva-calculado": articulo.iva,
        "valor-total": articulo.valor*articulo.cantidad-((articulo.valor*articulo.cantidad*articulo.iva)/100),
        "cantidad" : articulo.cantidad
      });
    });

    let body = {
      "numero-factura": 4,
      "valor-total": this.totalPagar,
      "nombre-cajero": "Jonathan Payares",
      "fecha-venta": mm + '/' + dd + '/' + yyyy,
      "nombre-establecimiento": this.nombreEstablecimiento,
      "nit": this.nit,
      "ahorro": this.ahorro,
      "valor-pagado": this.valorPagado,
      "productos": this.articulosBody
      /*"productos": [
        {
          "codigo": 1,
          "iva-calculado": 5.0,
          "valor-total": 3000.0,
          "cantidad": 4
        },
        {
          "codigo": 2,
          "iva-calculado": 8.0,
          "valor-total": 4000.0,
          "cantidad": 6
        },
        {
          "codigo": 3,
          "iva-calculado": 8.0,
          "valor-total": 4000.0,
          "cantidad": 6
        }
      ]*/
    };

    console.log(body);
    this.invocarServicio(JSON.stringify(body));

    swal("Correcto", "Gracias por su compra \n"+
    "Registro DIAN: ANTXC0000000000012365410 \n"+
    "Fecha: "+mm + '/' + dd + '/' + yyyy+"\n"+
    "Hora: "+hour + ':' + minu +"\n"+
    "Cajero: Jonathan Payares"
    , "success");
  }

}
