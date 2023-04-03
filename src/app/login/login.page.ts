import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  isDarkMode = false;
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {}
  
    
  
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  
    
  

  ngOnInit() {}
  async login(user: User) {
    
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Espere un momento por favor..."
      });
      await loader.present();

     
      try {
        await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data =>{
          console.log(data);

          this.navCtrl.navigateRoot("home");
        })
        
      } catch (e:any) {
        e.message = "Usuario no registrado";
        let errorMessage = e.message || e.getLocalizedMessage();
        
        this.showToast(errorMessage);     
      }

      await loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Ingrese un correo");
      return false;
    }

    if (!this.user.password) {
      this.showToast("Ingrese una contraseña");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 5000 // Aumenta la duración del mensaje a 5 segundos
    }).then(toastData => toastData.present());
  }

}
