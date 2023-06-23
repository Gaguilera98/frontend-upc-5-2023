import { Component, OnInit } from '@angular/core';
import { HproductoService } from '../servicios-backend/hproducto/hproducto.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page  {
  public listHProducto = [];
  public id = ""
  public cantidad = ""
  public idProducto = ""
  public idCarritoCompra=""
  public producto=""
  public carritoCompra=""
  public swGuardarCambios = false


  constructor(private hproductoService: HproductoService) {
    this.GetHProductos();
   }
  public GetHProductos(){
    this.hproductoService.GetHProductos().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listHProducto = response.body;
            console.log(this.listHProducto)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.GetHProductos()');
        },
    });
  }
  public addHproductos(){
    if ( this.cantidad.length > 0 && this.idProducto.length > 0 && this.idCarritoCompra.length > 0 ) {
        var entidad = {
            
          cantidad : this.cantidad,
          IdProducto : this.idProducto,
          IdCarritoCompra : this.idCarritoCompra
            
        }
        console.log(entidad)
        this.hproductoService.AddHproductos(entidad).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if(response.body == 1){
                    alert("Se agrego el Carrito con exito :)");
                    this.GetHProductos();//Se actualize el listado
                    this.cantidad="";
                    this.idProducto = "";
                    this.idCarritoCompra="";
                   
                }else{
                    alert("Al agregar el detalle falló :(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log('complete - this.addHproductos()');
            },
        });
    }
}
 

}
