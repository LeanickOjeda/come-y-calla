import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppiPage } from './appi.page';

const routes: Routes = [
  {
    path: '',
    component: AppiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppiPageRoutingModule {}
