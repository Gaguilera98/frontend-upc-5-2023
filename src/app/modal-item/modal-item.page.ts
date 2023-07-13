import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservaService } from '../servicios-backend/reserva/reserva.service';
import { HttpResponse } from '@angular/common/http';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { HabitacionesService } from '../servicios-backend/habitaciones/habitaciones.service';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.page.html',
  styleUrls: ['./modal-item.page.scss'],
})
export class ModalItemPage  {
  public listhabitaionModal=[]
  public listUsaurioModal=[]
  public idHabitacion=""
  public idUsuario=""
  public fechaEntrada=""
  public fechaSalida=""
  public estadoReserva=""
  public swGuardarCambios = false
  public preuba= ""
  public isModalOpen= false
  //@ViewChild(ModalController) modal: ModalController;
  

  constructor(private modalhabitacionservice: HabitacionesService, 
    private modalusuarioservice: UsuariosService,
    private modalreservaservice: ReservaService,
    private navController: NavController,
    private modalController: ModalController) {
    this.getHabitaciones();
    this.getUsuarios();
   }

  private getHabitaciones(){
    this.modalhabitacionservice.GetHabitaciones().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listhabitaionModal = response.body;
            
           
      console.log(this.preuba);
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.getHabitaciones()');
        },
    });
  }

  private getUsuarios(){
    this.modalusuarioservice.GetUsuarios().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listUsaurioModal = response.body;
            console.log(this.listUsaurioModal)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.getUsuarios()');
        },
    });
  }


  public addReserva() {
    console.log('idHabitacion:', this.idHabitacion);
  console.log('idUsuario:', this.idUsuario);
  console.log('fechaEntrada:', this.fechaEntrada);
  console.log('fechaSalida:', this.fechaSalida);
  console.log('estadoReserva:', this.estadoReserva);
    
      const entidad = {
        idHabitacion: this.idHabitacion,
        idUsuario: this.idUsuario,
        fechaEntrada: this.fechaEntrada,
        fechaSalida: this.fechaSalida,
        estadoReserva: this.estadoReserva
      };

      console.log(entidad);

      this.modalreservaservice.AddReserva(entidad).subscribe({
        next: (response: HttpResponse<any>) => {
          console.log(response.body);
          if (response.body === 1) {
            alert('Se agregó la reserva con éxito :)');
            this.resetFormulario();
         
          } else {
            alert('Hubo un error al agregar la reserva :(');
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete - this.addReserva()');
        }
      });
    
  }

  private resetFormulario() {
    this.idHabitacion = '';
    this.idUsuario = '';
    this.fechaEntrada = '';
    this.fechaSalida = '';
    this.estadoReserva = '';
    
  }
  
  cerrarModal() {
    this.modalController.dismiss().then(() => {
      this.navController.navigateForward('/tabs/tab7');
    });

}

}

