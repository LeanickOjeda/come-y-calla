import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage'
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuprincipalComponent } from './components/menuprincipal/menuprincipal.component';
import { HttpClientModule} from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbserviceService} from './services/dbservice.service';
import { AuthGardService } from './services/auth-gard.service';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [AppComponent, MenuprincipalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    SplashScreen,
    StatusBar,
    SQLite, 
    DbserviceService,
    AuthGardService,
    AuthenticationService],
  bootstrap: [AppComponent],
  exports: [MenuprincipalComponent],
})
export class AppModule {}
