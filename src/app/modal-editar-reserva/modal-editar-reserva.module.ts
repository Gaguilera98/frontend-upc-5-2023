import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditarReservaPageRoutingModule } from './modal-editar-reserva-routing.module';

import { ModalEditarReservaPage } from './modal-editar-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditarReservaPageRoutingModule
  ],
  declarations: [ModalEditarReservaPage]
})
export class ModalEditarReservaPageModule {}
