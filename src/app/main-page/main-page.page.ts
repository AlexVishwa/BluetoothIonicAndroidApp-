import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  pairedList: pairedlist;
  listToggle: boolean = false;
  pairedDeviceId: number = 0;
  dataSend: string="";
  
  constructor(public navCtrl: NavController, private alertController: AlertController, private bluetoothserial: BluetoothSerial,private toastCtrl: ToastController) {
    this.checkBluetoothEnabled();
   }

  ngOnInit() {
  }
  enableBt(){
    this.bluetoothserial.enable().then(success=>{
      this.showToast("Enabled");
    },
    error =>{
      this.showError("Unable to enable Bluetooth");
    });
  }
  checkBluetoothEnabled(){
    this.bluetoothserial.isEnabled().then(success=>{
      this.listPairedDevices();  
    },error =>{
      this.showError("Please Enable Bluetooth")
    });
  }
  listPairedDevices(){
    this.bluetoothserial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    },error=>{
      this.showError("Please Enable Bluetooth")
      this.listToggle = false;
    });
  }
  selectDevice(){
    let connectedDevice = this.pairedList[this.pairedDeviceId];
    if(!connectedDevice.address){
      this.showError('Select paired device to connect');
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;
    this.connect(address);
  }
  connect(address){
    this.bluetoothserial.connect(address).subscribe(success=>{
    
    this.showToast("Successfully Connected");
    this.navCtrl.navigateForward('/login');
    }, error => {
      this.showError("Error:Connecting to Device");
    });
  }
  
  async showError(error){
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
  async showToast(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
interface pairedlist{
  "class": number,
  "id": string,
  "address": string,
  "name": string
}