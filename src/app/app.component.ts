import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    //private sqlite: SQLite,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    /*
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
      db.executeSql('create table schedule(serial Int,start Text,end Text)', []).then(() => console.log('Executed SQL')).catch(e => console.log(e));}).catch(e => console.log(e));
  */
    }  
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
