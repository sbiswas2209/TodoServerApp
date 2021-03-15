import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'

interface ToDoData{
  todos: [],
  status: string,
  code: number

}

interface DeleteData{
  result: [],
  message: string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasks: any = [];

  constructor(private http:HttpClient, private storage: Storage, private router: Router, private toastController: ToastController) {}

  ngOnInit(){
    this.storage.get('token').then((val) => {
      console.log(`ID : ${val}`);
      this.http.post('http://localhost:5000/all', 
        {
          id: val,
        }
      ).subscribe((response: ToDoData) => {
        console.log(`Todos : ${response.todos}`);
        this.tasks = response.todos;
      })
    })
  }

  async deleteTask(task: any){
    console.log()
    this.storage.get('token').then((val) => {
      console.log(`ID : ${val}`);
      this.http.post('http://localhost:5000/deleteItem', 
        {
          id: task.id,
          userId: val
        }
      ).subscribe((response: DeleteData) => {
        console.log(`Todos : ${response.result}`);
        this.tasks = response.result;
        this.presentToast(response.message);
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

  async logOut(){
    this.storage.remove('token').then((val) => {
      this.router.navigate(['/auth'])
    })
  }

}
