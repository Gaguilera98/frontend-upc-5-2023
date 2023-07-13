import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditarReservaPage } from './modal-editar-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditarReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditarReservaPageRoutingModule {}
