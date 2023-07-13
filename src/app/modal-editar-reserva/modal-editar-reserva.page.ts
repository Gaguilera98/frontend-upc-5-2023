import { Component, Input, OnInit } from '@angular/core';
import { IonDatetime, ModalController, NavController } from '@ionic/angular';
import { ReservaService } from '../servicios-backend/reserva/reserva.service';
import { UsuariosService } from '../servicios-backend/usuarios/usuarios.service';
import { HabitacionesService } from '../servicios-backend/habitaciones/habitaciones.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-editar-reserva',
  templateUrl: './modal-editar-reserva.page.html',
  styleUrls: ['./modal-editar-reserva.page.scss'],
})
export class ModalEditarReservaPage {
  @Input() reserva: any; // Propiedad para recibir los datos de la reserva 
  public listhabitaionModal=[]
  public listUsaurioModal=[]
  public id=""
  public idHabitacion=""
  public idUsuario=""
  public fechaEntrada=""
  public fechaSalida=""
  public estadoReserva = ""
  public swGuardarCambios = false
  public isModalOpen= false

  constructor(private modalhabitacionservice: HabitacionesService, 
    private modalusuarioservice: UsuariosService,
    private navController: NavController,
    private modalController: ModalController,
    private reservaService: ReservaService) { 

      this.getHabitaciones();
      this.getUsuarios();
    }
   ionViewDidEnter(){
      this.id = this.reserva.id;
      this.idHabitacion = this.reserva.idHabitacion;
      this.idUsuario = this.reserva.idUsuario;
      this.fechaEntrada = this.reserva.fechaEntrada.substring(0, 10);
      this.fechaSalida = this.reserva.fechaSalida.substring(0, 10);
      this.estadoReserva = this.reserva.estadoReserva;
      console.log(this.estadoReserva,"ppp");
    }
    private getHabitaciones(){
      this.modalhabitacionservice.GetHabitaciones().subscribe({
          next: (response: HttpResponse<any>) => {
              this.listhabitaionModal = response.body;
              
             
        
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

    public guardarCambios(){
      
          var entidad = {
            id: this.id,
            idHabitacion: this.idHabitacion,
            idUsuario: this.idUsuario,
            fechaEntrada: this.fechaEntrada,
            fechaSalida: this.fechaSalida
           
          }
          console.log(entidad,"modificar")
          this.reservaService.UpdateReserva(entidad).subscribe({
              next: (response: HttpResponse<any>) => {
                  console.log(response.body)//1
                  if(response.body == 1){
                      alert("Se modifico la reserva con exito :)");
                      //this.GetProductos();//Se actualize el listado
                      /* this.idProducto = "";
                      this.nombreProducto = "";
                      this.idCategoria = ""; */
                  }else{
                      alert("Al modificar la reserva fallo :(");
                  }
              },
              error: (error: any) => {
                  console.log(error);
              },
              complete: () => {
                  console.log('complete - this.guardarCambios()');
              },
          });
      
  }

    cerrarModal() {
      this.modalController.dismiss().then(() => {
        this.navController.navigateForward('/tabs/tab7');
      });
  
  }
  

}
