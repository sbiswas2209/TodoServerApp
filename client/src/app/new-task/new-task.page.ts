import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

interface NewItemData{
  message: string,
}

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {

  title:string;
  content: string;

  constructor(private storage: Storage, private http: HttpClient, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  addItem(){
    this.storage.get('token').then((val) => {
      this.http.post('http://localhost:5000/tasks/addItem',
        {
          title: this.title,
          content: this.content,
          userId: val
        }
      ).subscribe((response: NewItemData) => {
        this.presentToast(response.message);
        this.router.navigate(['/auth'])
      })
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: `${message}`,
      duration: 2000,
    });
    toast.present();
  }

}
