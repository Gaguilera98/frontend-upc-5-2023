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

 

}
