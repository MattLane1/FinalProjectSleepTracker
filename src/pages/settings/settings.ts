/*
@Page - Settings.ts
@Purpose - This is the settings TypeScript page of my program, it is where the Settings page connects the buttons and such
@Program - SleepTracker
@Auther - Matthew Lane
@Date - April 12th, 2017
*/

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
    //The user has selected Red
    red()
    {
        this.events.publish('colour:changed', "#ff0000");
       // redCheck: true;
    }

    //The user has selected Green
    green()
    {
        this.events.publish('colour:changed', "#32db64");
    }

    //The user has selected Blue
    blue()
    {
        this.events.publish('colour:changed', "#1a75ff");
    }

    //The user has selected Yellow
    yellow() {
        this.events.publish('colour:changed', "#ffd800");
    }

    //The user has selected Grey
    grey() {
        this.events.publish('colour:changed', "#808080");
    }

    //The user has selected Black
    black() {
        this.events.publish('colour:changed', "#000000");
    }
}
