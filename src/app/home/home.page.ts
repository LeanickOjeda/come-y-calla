import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbserviceService } from '../services/dbservice.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any; // Generamos una variable Any (permite cualquier valor)

  /**
   * En el constructor del HomePage se colocan por parametros
   * todas aquellas propiedades con el siguiente formato
   * private = visibilidad
   * activeRoute = identificador
   * ActiveRoute = Tipo de Objeto
   * : Indica que el identificador sera de la clase posterior a los : puntos
   * 
   */

   constructor(private menuctlr : MenuController, public DbserviceService: DbserviceService,public authenticationSerive:AuthenticationService, private router: Router) {
  }
  
  segmentChanged($event){
    console.log($event.detail.value);
    let direction=$event.detail.value;
    this.router.navigate(['home/'+direction]);
  }
  /**
   * Antes de que se muestre la visual
   * se redirecciona a la url especifica
   */
  ionViewWillEnter(){
    this.router.navigate(['home/inicial']);
  }
  /**
   * Función que permite cerrar la sesión actual
   * actualiza el sesion_data de SQLite
   */
  logout(){
    this.authenticationSerive.logout();
  }

  
  onclick(){
    this.menuctlr.toggle();
  }

}
