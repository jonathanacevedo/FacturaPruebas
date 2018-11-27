import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor() { }

  public articulos = [];

  ngOnInit() {

  }

  agregarArticulo(){
    this.articulos.push( {
      "nombre": "articulo"+this.articulos.length,
      "valor": 0
    }
    );
    console.log(this.articulos);
  }

  retirarArticulo(){
    this.articulos.pop();
  }

  guardar(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    swal("Correcto", "Gracias por su compra \n"+
    "Registro DIAN: ANTXC0000000000012365410 \n"+
    "Fecha: "+mm + '/' + dd + '/' + yyyy+"\n"+
    "Hora: "+hour + ':' + minu +"\n"+
    "Cajero: Jonathan Payares"
    , "success");
    

  }

}
