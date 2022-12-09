import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbserviceService } from './services/dbservice.service';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public dbserviceService: DbserviceService,
    public sqlite: SQLite,
    public authenticationService:AuthenticationService,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.createDatabase();
      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
  /**
   * Función privada que se encarga de generar la base de datos
   */
  private createDatabase(){
    this.sqlite.create({ // Se usa la función create para crear la base de datos
      name:'data.db', // Se llamara data
      location:'default'
    }).then((db)=>{
      this.dbserviceService.setDatabase(db);
      this.dbserviceService.createTables();
    }) // Si todo sale bien, muestra por consola el log del db
    .catch(error=>{console.error('sadasd');}); // Si sale algo mal, muestra por consola el error
  }
}
