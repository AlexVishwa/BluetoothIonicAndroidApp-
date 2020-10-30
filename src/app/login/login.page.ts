import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController} from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) { }

  ngOnInit() {
  }
  pass(pwd){
    if(pwd=='123456')
    {
      this.navCtrl.navigateForward('/home');
    }
    else{
      this.showError();
    }
  }
  async showError(){
    const alert = await this.alertCtrl.create({
      header: 'Wrong Id Entered',
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}
