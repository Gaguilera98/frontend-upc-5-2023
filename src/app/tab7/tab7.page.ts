import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from '../servicios-backend/reserva/reserva.service';
import { HttpResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ModalItemPage } from '../modal-item/modal-item.page';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page {
  public lisReserva=[];
  public filtro: string ;
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
            this.filtrarReservas(); // Aplicar el filtro de búsqueda inicial
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
  public filtrarReservas() {
    this.lisReserva = this.lisReserva.filter((reserva) =>
      reserva.id.includes(this.filtro)
    );
  }

}

