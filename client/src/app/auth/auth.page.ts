import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

interface SignUpData {
  token: string;
  message: string;
}

interface LoginData {
  authToken: string;
  message: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogIn: boolean = true;
  data: any;
  username: string;
  password: string;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.storage.get('token').then((token) => {
      console.log(`Token : ${token}`);
      if (token != null) {
        this.router.navigate(['/home']);
      }
    });
  }

  switchAuth() {
    this.isLogIn = !this.isLogIn;
  }

  async logIn() {
    await this.http
      .post('http://localhost:5000/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe(async (response: LoginData) => {
        console.log(`${response.authToken}`);
        this.storage.set('token', response.authToken).then(async (val) => {
          console.log(`Value : ${val}`)
          await this.presentToast(response.message);
          this.router.navigate(['/home']);
        });
      });
  }

  async signUp() {
    await this.http
      .post('http://localhost:5000/signUp', {
        username: this.username,
        password: this.password,
      })
      .subscribe(async (response: SignUpData) => {
        console.log(`${response}`);
        await this.storage.set('token', response.token).then(async (val) => {
          await this.presentToast(response.message);
        this.router.navigate(['/home']);
        });
        
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 2000,
    });
    toast.present();
  }
}
