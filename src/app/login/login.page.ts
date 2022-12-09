import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { DbserviceService } from '../services/dbservice.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login:any={
    Usuario:"",
    Password:""
  }

  field:string="";

  constructor(public toastController: ToastController,
    public DbserviceService: DbserviceService,
    public alertController: AlertController,
    private router: Router,
    private storage: Storage,
    public authenticationSerive:AuthenticationService, private animationCtrl: AnimationController) { }
  

  ngOnInit() {
  }

  ingresar(){
    // Se valida que el usuario ingreso todos los datos
    if(this.validateModel(this.login)){
      // Se obtiene si existe alguna data de sesión
      this.authenticationSerive.login(this.login);
    }
    else{
      this.presentToast("Falta: "+"muchas cosas");
    }
  }

  registrar(){
    this.createSesionData(this.login);
  }

  createSesionData(login: any) {
    if(this.validateModel(login)){ // Se valida que se ingresen todos los datos
      /**
       * Se hace una copia del login, se hace así ya que
       * el operador '=' no haceuna copia de los datos, si no
       * que crea una nueva referencia a los mismos datos.
       * Por eso se utiliza el Object.assign
       */
      let copy = Object.assign({},login);
      copy.Active=1; // Se agrega el valor active = 1 a la copia
      this.DbserviceService.createSesionData(copy) // la copia se le apsa a la función para crear la sesion
      .then((data)=>{ // si la sentencia se ejecuto correctamente
        this.presentToast("Bienvenido"); // Se muestra el mensaje de bienvenido
        this.storage.set("USER_DATA",data);  // Se setea el USER_DATA en el storage
        this.router.navigate(['home']); // Se navega hasta el home
      })
      .catch((error)=>{
        this.presentToast("El usuario ya existe");
      })
    }
    else{
      this.presentToast("Falta: "+this.field);
    }
  }

  validateModel(model:any){
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value=="") {
        // Se asigna el campo faltante
        this.field=key;
        // Se retorna false
        return false;
      }
    }
    return true;
  }

  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }

  ionViewWillEnter(){
    console.log('ionViewDidEnter');
      // Se valida que exista una sesión activa
      this.DbserviceService.sesionActive()
      .then((data)=>{
        if(data!=undefined){
          this.storage.set("USER_DATA",data); 
          this.router.navigate(['home']);
        }
      })
      .catch((error)=>{
        console.error(error);
        this.router.navigate(['login']);
      })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Creación de Usuario',
      message: 'Mensaje <strong>El usuario no existe, desea registrarse?</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.createSesionData(this.login)
          }
        }
      ]
    });

    await alert.present();
  }

  /* Animación */

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

/* Animacion encargada del fondo */

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

/* Animacion encargada de la transicion al register */
    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

/* ... */
    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

/* Animacion de Salida (Es la de entrada pero en reversa) */
  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };


}
