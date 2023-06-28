import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../servicios-backend/habitaciones/habitaciones.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page {
 public listHabitaciones=[];
  public Id="";
  public Nombre="";
  public Area="";
  public Capacidad="";
  public Descripcion="";

  constructor(private habitacionService: HabitacionesService) { 
    this.getHabitaciones();
  }

  private getHabitaciones(){
    this.habitacionService.GetHabitaciones().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listHabitaciones = response.body;
            console.log(this.listHabitaciones)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.getHabitaciones()');
        },
    });
  }

}
