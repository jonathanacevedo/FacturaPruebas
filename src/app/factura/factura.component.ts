import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { InsertarFacturaService } from '../servicios/insertar-factura.service';
import swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { toObservable } from '@angular/forms/src/validators';
import { TypeScriptEmitter } from '@angular/compiler';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(public servicio: InsertarFacturaService) { }

  public articulos = [];
  public codigo: any = '';
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
      "codigo": 0,
      "nombre": "",
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
      this.totalPagar = this.totalPagar+(articulo.valor*articulo.cantidad+((articulo.valor*articulo.cantidad*articulo.iva)/100));
    });
    this.cambio = this.valorPagado - this.totalPagar;
  }

  invocarServicio(body: string): void {
    this.servicio.registrarFactura(body).subscribe((data) => {
      //console.log(data);
    });
  }

  getProducto(articulo){
    this.servicio.obtenerProducto(articulo.codigo).subscribe((data) => {
      console.log(data);
      articulo.valor = data.valorUnitario;
      articulo.nombre = data.producto;
      articulo.iva = data.iva;
    });
    /*this.articulos.forEach((articulo) => {
      this.articulosBody.push({
        "codigo" : articulo.codigo
      });
      this.servicio.obtenerProducto(articulo.codigo).subscribe((data) => {
        console.log(data);
      });
    });*/
  }

  retornaTabla(): any{
    var tabla = '<table style="width:100%; align-text: left;">';
    this.articulos.forEach((articulo) => {
      tabla += '<tr><td>'+articulo.nombre+'</td><td>'+articulo.valor+'</td></tr>';
    });
    tabla += '</tabla>';

    return tabla;
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
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
        "codigo": articulo.codigo,
        "iva-calculado": articulo.iva,
        "valor-total": articulo.valor*articulo.cantidad+((articulo.valor*articulo.cantidad*articulo.iva)/100),
        "cantidad" : articulo.cantidad
      });
    });

    let body = {
      "numero-factura": 4,
      "valor-total": this.totalPagar,
      "nombre-cajero": "Jonathan Payares",
      "fecha-venta": yyyy + '-' + mm + '-' + dd,
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

    swal({
      title: '<strong><u>'+this.nombreEstablecimiento+'</u></strong>',
      html:
      this.retornaTabla()
      ,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Imprimir',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down">Guardar</i>',
      cancelButtonAriaLabel: 'Thumbs down',
    })

  /*  swal("Correcto", "Gracias por su compra \n"+
    "Registro DIAN: ANTXC0000000000012365410 \n"+
    "Fecha: "+mm + '/' + dd + '/' + yyyy+"\n"+
    "Hora: "+hour + ':' + minu +"\n"+
    "Cajero: Jonathan Payares"
    , "success");

    */
  }

}
