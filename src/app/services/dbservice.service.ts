import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  db: SQLiteObject = null;

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
   }
   crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'usuarios.db',
        location: 'default'

      }).then((db: SQLiteObject) => {
        this.db = db;
        this.presentToast("BD Creada");
        //llamamos a la creación de tablas
        this.createTables();
      }).catch(e => this.presentToast(e));
    })
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  setDatabase(db:SQLiteObject) {
    if(this.db===null)
    {
      this.db=db
    };
  }

  createTables():Promise<any>{
    let tables=`
    CREATE TABLE IF NOT EXISTS sesion_data
    (
      Username TEXT PRIMARY KEY NOT NULL,
      Password INTEGER NOT NULL,
      active INTEGER(1) NOT NULL
    );`;  
    return this.db.executeSql(tables); 
  }

  sesionActive(){
    // Se desarrolla la consulta
    let sql = `SELECT Username,active FROM sesion_data WHERE active=1 LIMIT 1`;
    // Se ejecuta la consulta y no le pasamos parametros [value,value1,...]
    return this.db.executeSql(sql,[])
    // Cuando se ejecute la consulta
    .then(response=>{ // obtenemos lo que devuelve la consulta
      return Promise.resolve(response.rows.item(0)); // Se obtiene el primer item de la consulta y se retorna
    });
  }
  /**
   * Función que valida la existencia del usuario que esta iniciando sesión
   * @param sesion Datos de inicio de sesión Usuario y Password
   */
  getSesionData(sesion:any){
    let sql = `SELECT Username, active FROM sesion_data
    WHERE Username=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql,[sesion.Usuario,
      sesion.Password]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });
  }
  /**
   * Función que crea un nuevo registro de inicio de sesión
   * @param sesion Datos de inicio de sesión Usuario, Password y Active
   */
  createSesionData(sesion:any){
    let sql = `INSERT INTO sesion_data(Username,Password,active)
    VALUES(?,?,?)`;
    return this.db.executeSql(sql, [sesion.Usuario, 
      sesion.Password, sesion.Active]).then(response=>{
        return Promise.resolve(response.rows.item(0));
      });;
  }
  updateSesionData(sesion:any){
    let sql = `UPDATE sesion_data
    SET active=?
    WHERE Username=?`;
    return this.db.executeSql(sql, [sesion.active,sesion.Username]);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
    }




}
