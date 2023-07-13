import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from '../servicios-backend/reserva/reserva.service';
import { HttpResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalItemPage } from '../modal-item/modal-item.page';
import { ModalEditarReservaPage } from '../modal-editar-reserva/modal-editar-reserva.page';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page {
  public lisReserva=[];
  public filtro: string ;
  public estadoReserva =""
  public id=""
  public listEstadosReservas=["Pendiente", "Pagada","Cancelada"]
 


  @ViewChild(ModalController) modal: ModalController;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  constructor(private reservaservice: ReservaService, private modalController: ModalController) { 
    this.getReservas();
   }

  private getReservas(){
    this.reservaservice.GetReserva().subscribe({
        next: (response: HttpResponse<any>) => {
            this.lisReserva = response.body;
            console.log(this.lisReserva)
            //this.filtrarReservas(); // Aplicar el filtro de búsqueda inicial
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.getReservas()');
        },
    });
  }


  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalItemPage, // Reemplaza "TuModalComponent" por el nombre de tu componente modal
      componentProps: {
        // Aquí puedes pasar propiedades adicionales al componente modal si lo necesitas
      }
    });
  
    await modal.present();
  }
  async abrirModalEdicion(reserva: any) {
    console.log(reserva,"abremodal");
    const modal = await this.modalController.create({
      component: ModalEditarReservaPage,
      componentProps: {
        reserva: reserva 
        
        
       
      }
    });

    await modal.present();
  }
 
  
  public guardarCambios() {
    console.log(this.estadoReserva)
    console.log(this.id)
    if (this.id && this.estadoReserva) {
      const entidad = {
        id: this.id,
        estadoReserva: this.estadoReserva
      };
  
      this.reservaservice.UpdateEstadoReserva(entidad).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.body === 1) {
            alert("Se modificó el estado de la reserva con éxito");
            this.getReservas(); // Actualizar el listado de reservas
          } else {
            alert("Error al modificar el estado de la reserva");
          }
        },
        error: (error: any) => {
          console.log(error);
          alert("Error al modificar el estado de la reserva");
        },
        complete: () => {
          console.log('complete - this.guardarCambios()');
        },
      });
    } else {
      alert("Seleccione una reserva y un estado");
    }
  }
  
  /* public filtrarReservas() {
    this.lisReserva = this.lisReserva.filter((reserva) =>
      reserva.id.includes(this.filtro)
    );
  } */
 public deleteReserva(item){
        console.log(item.id)
        this.reservaservice.DeleteReserva(item).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if(response.body == 1){
                    alert("Se elimino la categoria con exito :)");
                    this.getReservas();//Se actualize el listado
                }else{
                    alert("Al eliminar la categoria fallo exito :(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log('complete - this.getReservas()');
            },
        });
    }
    public ActivateReserva(item){
      console.log(item.id)
      this.reservaservice.ActivateReserva(item).subscribe({
          next: (response: HttpResponse<any>) => {
              console.log(response.body)//1
              if(response.body == 1){
                  alert("Se Activó el registro con exito :)");
                  this.getReservas();//Se actualize el listado
              }else{
                  alert("Al activar el registro falló  :(");
              }
          },
          error: (error: any) => {
              console.log(error);
          },
          complete: () => {
              console.log('complete - this.getReservas()');
          },
      });
  }
}

