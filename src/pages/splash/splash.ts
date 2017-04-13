/*
@Page - Splash.ts
@Purpose - This is the splash TypeScript page
@Program - SleepTracker
@Auther - Matthew Lane
@Date - April 12th, 2017
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})

export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

}
