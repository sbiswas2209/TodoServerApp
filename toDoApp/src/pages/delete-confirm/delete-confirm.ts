import { SignUpPage } from './../sign-up/sign-up';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DeleteConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-delete-confirm',
  templateUrl: 'delete-confirm.html',
})
export class DeleteConfirmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteConfirmPage');
  }

  deleteCompleteData(){
    this.storage.clear();
    this.navCtrl.setRoot(SignUpPage);
  }

}
