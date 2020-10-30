import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController,ToastController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Component({
  selector: 'modal',
  templateUrl: 'modal.page.html',
  styleUrls: ['./modal.page.scss'],
  providers:[NativeStorage]
})
export class ModalPage implements OnInit{
  element: HTMLInputElement;
  startP: string;
  endP: string;
  dataSend: string="";
    //Get value on ionChange on IonRadioGroup
    selectedRadioGroup:any;
    //Get value on ionSelect on IonRadio item
    selectedRadioItem:any;
  constructor(private nativeStorage: NativeStorage,public alertCtrl: AlertController,public modalController: ModalController, public navctr: NavController, private storage:Storage, private toastCtrl: ToastController,private bluetoothserial: BluetoothSerial) {
    this.checkSerialAvailable();
  }
  
  ngOnInit(){

  }
  sendDosing(State: boolean){
    if(State==true)
    this.dataSend='E.0\n';
    else
    this.dataSend='E.1\n';
    
    this.bluetoothserial.write(this.dataSend).then(success =>{
      this.showToast(success);
    }, error => {
      this.showError(error);
    });
  }
  sendDescaling(State: boolean){
    if(State==true)
    this.dataSend='K.0\n';
    else
    this.dataSend='K.1\n';
    
    this.bluetoothserial.write(this.dataSend).then(success =>{
      this.showToast(success);
    }, error => {
      this.showError(error);
    });
  }
  sendDosingDuration(duration: number){
    
    this.dataSend='F.'+duration+'\n';
    this.bluetoothserial.write(this.dataSend).then(success =>{
      
    }, error => {
      
    });
  }
  checkSerialAvailable(){
    this.bluetoothserial.available().then(success=>{
    }, error=>{
      this.showError(error);
    });
  }
  radioGroupChange(event) {
    this.selectedRadioItem = event.detail.value;
    this.showToast(event.detail.value);
    if(event.detail.value=='a')
    this.dataSend='D.1\n';
    else if(event.detail.value=='b')
    this.dataSend='D.2\n';
    else if(event.detail.value=='c')
    this.dataSend='D.3\n';
    this.bluetoothserial.write(this.dataSend).then(success =>{
      
    }, error => {
      
    });
  }
  radioGroupChange2(event) {
    this.selectedRadioItem = event.detail.value;
    if(event.detail.value=='auto')
    this.dataSend='G.0\n';
    else
    this.dataSend='G.1\n'
    this.bluetoothserial.write(this.dataSend).then(success =>{
      
    }, error => {
      
    });
  }
  radioFocus() {
    console.log("radioFocus");
  }
  radioSelect(event) {
    console.log("radioSelect",event.detail);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async showToast(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
  async save(temp:number,doseDuration:string){
    let start: string = this.startP;
    let end: string = this.endP;

   //this.sqlite.insert("Insert into schedule values()")
   //this.navctr.navigateBack('/home');
   this.element= document.getElementsByName("entry")[0] as HTMLInputElement;
   start=this.element.value;
   this.element= document.getElementsByName("entry")[1] as HTMLInputElement;
   end=this.element.value;
   
   let findex:number= start.indexOf(':');
   let lindex:number= start.lastIndexOf(':');
   let start_h=start.slice(0,findex);
   let start_m=start.slice(lindex+1);
   let end_h=end.slice(0,findex);
   let end_m=end.slice(lindex+1);
   this.dataSend='F.'+doseDuration+'\n';
    this.bluetoothserial.write(this.dataSend).then(success =>{
    }, error => {
    });
   if(start==''){
    this.showError('Set Start Time');
    return false;
   }
   else if(end=='')
   {
     this.showError('Set End time');
     return false;
   }
   let s_time:number=parseInt(start_h)*60*60+parseInt(start_m)*60;
   let e_time:number=parseInt(end_h)*60*60+parseInt(end_m)*60;
   if(s_time>e_time){
     this.showError('Start time can\'t be greater than end time.');
     return false;
   }
   if(e_time-s_time>(999*60))
   {
    this.showError('Duration can not be more than 999 minutes');
    return false;
   }
   let duration: number=(e_time-s_time)/60;
   localStorage.setItem('start',start);
   localStorage.setItem('end',end);
   localStorage.setItem('duration',duration.toString());
   localStorage.setItem('temp',temp.toString());
   
   this.navctr.navigateForward('/login');
  }
  async showError(Header: string){
    const alert = await this.alertCtrl.create({
      header: Header,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}