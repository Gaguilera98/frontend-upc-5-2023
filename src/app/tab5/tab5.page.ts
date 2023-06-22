import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios-backend/carrito/carrito.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page{
  public listcarrito= [];
  public id = ""
  public idUsuario = ""
  public fecha = ""
  public producto=""
  public usuarios=""
  public swGuardarCambios = false
 
  constructor(private carritoservice: CarritoService) {
    this.GetCarrito();
   }
  public GetCarrito(){
    this.carritoservice.GetCarrito().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listcarrito = response.body;
            console.log(this.listcarrito)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.GetCarrito()');
        },
    });
  }

  public addCarrito(){
    if (this.idUsuario.length > 0  && this.fecha.length > 0 ) {
        var entidad = {
            
            fechac : this.fecha,
            idUser : this.idUsuario
            
        }
        console.log(entidad)
        this.carritoservice.AddCarrito(entidad).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if(response.body == 1){
                    alert("Se agrego el Carrito con exito :)");
                    this.GetCarrito();//Se actualize el listado
                    this.idUsuario = "";
                   
                }else{
                    alert("Al agregar el Carrito falló :(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log('complete - this.addCarrito()');
            },
        });
    }
}

}
