import { AlertController, ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { NavController } from '@ionic/angular';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  faPowerOff = faPowerOff;
  faLightBulb = faLightbulb;
  faCog = faCog;
  element: HTMLElement;
  element2: HTMLImageElement
  dataSend: string="";
  val:string ="";
  constructor(public navCtrl: NavController, private alertController: AlertController, private bluetoothserial: BluetoothSerial,private toastCtrl: ToastController) {
    this.checkSerialAvailable();

    
    }
    checkSerialAvailable(){
      this.bluetoothserial.available().then(success=>{
        this.deviceConnected();
      }, error=>{
        this.showError(error);
      });
    }
    
    increase(){
    let temp:number;
    let val: string;
    val=localStorage.getItem("temp");
    if(val!=null)
    {
    temp=parseInt(val);
    }
    else{
      temp=35;
    }
    temp++;
    localStorage.setItem("temp",temp.toString());
    this.dataSend='C.'+temp+'\n';
    
    this.bluetoothserial.write(this.dataSend).then(success =>{
      
    }, error => {
      this.showError(error);
    });
    this.checkSerialAvailable();
    }

    decrease(){
    let temp:number;
    let val: string;
    val=localStorage.getItem("temp");
    if(val!=null)
    {
    temp=parseInt(val);
    }
    else{
      temp=35;
    }
    temp--;
    localStorage.setItem("temp",temp.toString());
    this.dataSend='C.'+temp+'\n';
    this.bluetoothserial.write(this.dataSend).then(success =>{
      
    }, error => {
      this.showError(error);
    });
    this.checkSerialAvailable();
    }
  
    increaseTime(){
    let temp:number;
    let val: string;
    if(localStorage.getItem("duration")==null)
          {
            
            localStorage.setItem("duration","10");
          }
          else{
            val=localStorage.getItem("duration");
          }
      temp=parseInt(val);
    temp++;
    localStorage.setItem("duration",temp.toString());
    this.dataSend='B.'+temp+'\n';
    this.bluetoothserial.write(this.dataSend).then(success =>{
    }, error => {
      this.showError(error);
    });
    this.checkSerialAvailable();
    }

    decreaseTime(){
    let temp:number;
    let val: string;
    if(localStorage.getItem("duration")==null)
          {
            localStorage.setItem("duration","10");
          }
          else{
            val=localStorage.getItem("duration");
          }
    temp=parseInt(val);
    temp--;
    localStorage.setItem("duration",temp.toString());
    this.dataSend='B.'+temp+'\n';
    
    this.bluetoothserial.write(this.dataSend).then(success =>{
      
    }, error => {
      this.showError(error);
    });
    this.checkSerialAvailable();
    }

    deviceConnected(){
    
      
      this.bluetoothserial.subscribe('\n').subscribe(success => {

        let data: string=success;

        
        if(data.startsWith('A.0'))
        {
          this.element2= document.getElementById("myImage") as HTMLImageElement;
          if(this.element2.src.match("assets/powerOn.jpeg")){
            this.element2.src="assets/powerOff.png";
            }
    
        }
        else if(data.startsWith('A.1'))
        {
          this.element2= document.getElementById("myImage") as HTMLImageElement;
          if(this.element2.src.match("assets/powerOff.png")){
            this.element2.src="assets/powerOn.jpeg";
            }
        }
        else if(data.startsWith('B.0'))
        {
          this.element2= document.getElementById("myImage") as HTMLImageElement;
          this.element2.src="assets/powerOff.png";
        }
        else if(data.startsWith('B.1'))
        {
          this.element2= document.getElementById("myImage") as HTMLImageElement;
          this.element2.src="assets/powerOn.jpeg";
        }
        else if(data.startsWith('C.0'))
        {
          this.element2= document.getElementById("myImage3") as HTMLImageElement;
          if(this.element2.src.match("assets/redled.png")){
            this.element2.src="assets/greenled.png";
            }
        }
        else if(data.startsWith('C.1'))
        {
          this.element2= document.getElementById("myImage3") as HTMLImageElement;
          if(this.element2.src.match("assets/greenled.png")){
            this.element2.src="assets/redled.png";
            }
        }
        else if(data.startsWith('D.0'))
        {
          this.element2= document.getElementById("myImage2") as HTMLImageElement;
          if(this.element2.src.match("assets/redled.png")){
            this.element2.src="assets/greenled.png";
            }
        }
        else if(data.startsWith('D.1'))
        {
          this.element2= document.getElementById("myImage2") as HTMLImageElement;
          if(this.element2.src.match("assets/greenled.png")){
            this.element2.src="assets/redled.png";
            }
        }
        else if(data.startsWith('E.0'))
        {
          this.element2= document.getElementById("myImage4") as HTMLImageElement;
          if(this.element2.src.match("assets/redled.png")){
            this.element2.src="assets/greenled.png";
            }
        }
        else if(data.startsWith('E.1'))
        {
          this.element2= document.getElementById("myImage4") as HTMLImageElement;
          if(this.element2.src.match("assets/greenled.png")){
            this.element2.src="assets/redled.png";
            }
        }
        else if(data.startsWith('F.0'))
        {
          this.element2= document.getElementById("myImage5") as HTMLImageElement;
          if(this.element2.src.match("assets/redled.png")){
            this.element2.src="assets/greenled.png";
            }
        }
        else if(data.startsWith('F.1'))
        {
          this.element2= document.getElementById("myImage5") as HTMLImageElement;
          if(this.element2.src.match("assets/greenled.png")){
            this.element2.src="assets/redled.png";
            }
        }
        else if(data.startsWith('G.0'))
        {
          this.element2= document.getElementById("myImage6") as HTMLImageElement;
          if(this.element2.src.match("assets/redled.png")){
            this.element2.src="assets/greenled.png";
            }
        }
        else if(data.startsWith('G.1'))
        {
          this.element2= document.getElementById("myImage6") as HTMLImageElement;
          if(this.element2.src.match("assets/greenled.png")){
            this.element2.src="assets/redled.png";
            }
        }
        else if(data.startsWith("I"))
        {
          
          this.element=document.getElementById("temp") as HTMLElement;
          let t : string = data.slice(2);
          let temp2: number;
          let val:string;
          val=localStorage.getItem("temp");
          if(val==null)
          {
            localStorage.setItem('temp','35');
          }
          else{
          val=localStorage.getItem('temp');
          }
          temp2=parseInt(val);
          localStorage.setItem('curTemp',t);
          this.element.innerHTML= t+"/"+temp2;
          
        }
        else if(data.startsWith("J"))
        {
          this.element=document.getElementById("water") as HTMLElement;
          let t : string = data.slice(2);
          this.element.innerHTML= t+"%";
        }
        else if(data.startsWith("K"))
        {
    
        }
        else if(data.startsWith("L"))
        {
                  //For Minute countdown
          
                  let t : string = data.slice(2);
          let d: string;
          let setMin=parseInt(t);
          this.element=document.getElementById('steam') as HTMLElement;
          d=localStorage.getItem("duration");
          if(d==null)
          {
            d="10";
            localStorage.setItem("duration","10");
          }
          else{
            d=localStorage.getItem("duration");
          }
          this.element.innerHTML=t+"/"+d+"min";
          
          //before this was new comment
          //count_h=Math.floor(setMin/60);
            /*
          let count_s: number = 60,count_min: number;
          count_min=setMin;
          let x=setInterval(function(): void{
            this.element= document.getElementById('steam') as HTMLElement;
            count_s--;
            if (count_s == 0)
            {
              count_min--;
              count_s=60;
            }
            console.log(count_s);
            this.element.innerHTML=count_min+":"+count_s+"/"+setMin+" min";}, 1000);
      */
        }
      }, error => { 
       this.showError("Invalid Data");
        });
    }
    test(){
    }
    deviceDisconnected(){
      this.bluetoothserial.disconnect();
      this.showToast("Device Disconnected");
    }
    handleData(data:string){
      this.showToast(data);
    }
    readData(data:string){
      this.bluetoothserial.read().then(success=>{
        this.showToast(data);
      },error => {
        this.showError(error);
      });
    }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
    this.checkSerialAvailable();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
    this.checkSerialAvailable();
  }

  async showError(error:any){
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: error,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
  async showToast(msg:any){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
  
  check(){
    this.element2= document.getElementById("myImage") as HTMLImageElement;
    if(this.element2.src.match("powerOn.jpeg"))
    {
      this.sendS();
      this.element2.src="assets/powerOff.png";
    }
    else{
      this.sendN();
    }
  }
  sendS(){
    this.dataSend='A.1\n';
    this.bluetoothserial.write(this.dataSend).then(success =>{
    }, error => {
      this.showError(error);
    });
    this.deviceConnected();
  }
  sendN(){
    this.dataSend='A.0\n';
    this.bluetoothserial.write(this.dataSend).then(success =>{
    }, error => {
      this.showError(error);
    });
    this.deviceConnected();
  }
  glowS(){
    this.element2= document.getElementById("myImage2") as HTMLImageElement;
    if(this.element2.src.match("assets/redled.png"))
    {
    this.dataSend="B.0\n";
    this.element2.src="assets/greenled.png";  
  }
    else
    {
    this.dataSend="B.1\n";
  }
    this.bluetoothserial.write(this.dataSend).then(success =>{  
    }, error => {
      this.showError(error);
    });
    this.deviceConnected();
  }
  sendH(){

    }
  sendData(){
    this.dataSend+='\n';
    this.showToast(this.dataSend);
    this.bluetoothserial.write(this.dataSend).then(success =>{
      this.showToast(success);
    }, error => {
      this.showError(error);
    });
  }
  serialFlush(){
    this.bluetoothserial.clear().then(success =>{
      
    }, error => {
      this.showError(error);
    });
  }
    ngOnInit(){
      this.serialFlush();
      this.checkSerialAvailable();
      //this.showToast("Tera baap");
   let count_sec: number,count_m: number,count_h: number =0;
   let curTime2= new Date("June 26 2018").getTime();
   let findex:number,lindex:number,start_h:number,start_m:number,start_s:number;
   let end_h:number,end_m:number;
   let c:string;
   let val:string;
   let d: string;
   val=localStorage.getItem('start');
     if(val!=null)
     {
     findex= val.indexOf(':');
     lindex= val.lastIndexOf(':');
     start_h=parseInt(val.slice(0,findex));
     start_m=parseInt(val.slice(lindex+1));
     console.log(start_m+"Start time");
   
     val=localStorage.getItem('end');
     findex= val.indexOf(':');
     lindex= val.lastIndexOf(':');
     end_h=parseInt(val.slice(0,findex));
     end_m=parseInt(val.slice(lindex+1));
     console.log(end_h+"End time");
   
     val=localStorage.getItem('temp');
     c=val;
     d=localStorage.getItem('duration');
     }
   let x=setInterval(function(): void{
     //this.element = document.getElementById('Time') as HTMLElement;
     let old=new Date().getTime();
     let curTime=old-curTime2;
     count_h=Math.floor((curTime%(1000*60*60*24))/(1000*60*60));
     count_m=Math.floor((curTime%(1000*60*60))/(1000*60));
     count_sec=Math.floor((curTime%(1000*60))/1000);
     if (count_sec != 60){++count_sec;}
     else{++count_m;count_sec=0;}
     if (count_m == 60)
     {
       ++count_h;count_m=0;
     }
     if(count_h==start_h && count_m==start_m)
     {
   
       this.dataSend="\"A.1\",\"B."+d+"\",\"C."+c+"\"\n";
       this.showToast(this.dataSend);
       this.bluetoothserial.write(this.dataSend).then(success =>{  
         this.showToast(success);
         this.checkSerialAvailable();
       }, error => {
         this.showError(error);
       });
       
     }
     else{

     }
    //this.element.innerHTML=''+count_h; 
   }, 1000);
    }
        

        //this.element = document.getElementById('Date') as HTMLElement;
        //this.element.innerHTML=new Date().toDateString();

        //     document.getElementById('time').innerHTML="x";
   //   this.timeDiv.nativeElement.innerHTML=z.toUTCString();
          
          
}
