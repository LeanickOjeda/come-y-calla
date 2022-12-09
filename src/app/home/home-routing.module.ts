import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { InicialComponent } from '../inicial/inicial.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'inicial',
        component: InicialComponent
      },
      {
        path:'perfil',
        component: PerfilComponent
      },
      {
        path:'configuracion',
        component: ConfiguracionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
