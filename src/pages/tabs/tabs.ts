/*
@Page - tabs.ts
@Purpose - This is the tabs TypeScript page that allows for navigation
@Program - SleepTracker
@Auther - Matthew Lane
@Date - April 12th, 2017
*/

import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SettingsPage;


  constructor() {

  }
}
