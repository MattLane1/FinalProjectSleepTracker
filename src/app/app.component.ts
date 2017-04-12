import { Component, NgModule, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  items: FirebaseListObservable<any[]>;

  afp: AngularFire;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private ref: ChangeDetectorRef, af: AngularFire, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const itemObservable = af.database.object('/item');
    //  itemObservable.update({ name: 'gogo' });

      this.items = af.database.list('/items');
      console.log(this.items);

      this.afp = af;

      this.events.subscribe('SleepWake:wake', userEventData => {
          this.SaveData(userEventData);
      });

    });

    //Force refresh table
    setTimeout(() => {
        console.log("Ping!");
        this.ref.markForCheck();
    }, 2000)
  }

  SaveData(sleepArray: Array<any>) {
      console.log('SleepArray', sleepArray);
      console.log('SleepArray', sleepArray[0]);
      console.log('SleepArray test', sleepArray[0][0].data);
      console.log('SleepArray', sleepArray[1]);
      console.log('SleepArray', sleepArray[1].data);

      const itemObservable = this.afp.database.object('/DateInfo');
      const itemObservable2 = this.afp.database.object('/SleepInfo');

      itemObservable2.set({ SleepTrack: sleepArray[0][0].data });
      itemObservable.set({ DateTrack: sleepArray[1] });

      this.items = this.afp.database.list('/items');
      console.log(this.items);
  }


}
