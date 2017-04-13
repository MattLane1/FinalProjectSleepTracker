/*
@Page - Home.ts
@Purpose - This is TypeScript page associated with the HomePage.     
@Program - SleepTracker
@Auther - Matthew Lane
@Date - April 12th, 2017
*/

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*Template and selector reference add to class*/
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

/* Start of class coe */
export class HomePage {
    items: FirebaseListObservable<any[]>;// For work with firebase

    //When the user wakes or sleeps, disable the other button
    disableSleep;
    disableWake;

    //Variable for the current date and time
    currentDate: string;
    currentTime: string;

    //Variable for the time the user went to sleep
    sleepDate: string;
    sleepTime: string;

    //Variable for how long they slept
    timeSlept: string;

    constructor(public navCtrl: NavController, public storage: Storage, public events: Events, af: AngularFire) {

        //When the colour is changed, pick it up here to change the graph colour on the HTML
        this.events.subscribe('colour:changed', eventData => {

            //Connect the Firebase
            const itemObservable = af.database.object('/item');
            itemObservable.update({ name: 'Test!' });

            this.items = af.database.list('/items');
            console.log(this.items);

            //Assign background colour to the chart based on user selection
            console.log("=colourList[0]['backgroundColor']=--------Test", this.lineChartColors[0]['backgroundColor']);
            this.lineChartColors[0]['backgroundColor'] = eventData;
            console.log("=colourList[0]['backgroundColor']=--------Test", this.lineChartColors[0]['backgroundColor']);

            //Force chart update
            this.lineChartColors = this.lineChartColors.slice();

        });
        this.disableWake = true;
    }

    //Create the array
    public lineChartData: Array<any> = [
        { data: [8.2, 7.5, 9.4, 6.8, 10.2, 7.8, 8.5, 9.2, 8, 6.5, 7], label: 'Time Slept' }
    ];

    //Populate the graph options
    public lineChartLabels: Array<any> = ['3/28/2017', '3/29/2017', '3/30/2017', '3/31/2017', '4/1/2017', '4/2/2017', '4/3/2017', '4/4/2017', '4/5/2017', '4/6/2017', '4/7/2017' ];
    public lineChartOptions: any = {
        responsive: true,
        animation: false,
        
        scales: {
            xAxes: [{
                ticks: {
                    stepSize: 10,
                    autoSkip: false,
                },
                stacked: true,
                gridLines: {
                    lineWidth: 0,
                    color: "rgba(255,255,255,0)"
                }
            }],
        }
    }

    //Default colour selection
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
   
    //The user has pressed the button that they have gone to sleep
    sleep() {
        //Disable the sleep button, since we are already sleeping. 
        this.disableSleep = true;
        this.disableWake = false;

        //Get the current time and date
        this.sleepDate = new Date().toLocaleDateString();
        this.sleepTime = new Date().toLocaleTimeString();

    }

    //The user has woke up for the day
    wake() {
         //Disable the sleep button, since we are already sleeping
        this.disableSleep = false;
        this.disableWake = true;

         var passedMins;
         var passedHours;
         var passedSeconds;
         var prevSeconds;
         var tempSeconds;
         var prevTime;
         var prevDate;
         var curTime;
         var curDate;

         
         //Get the current and time and date
         this.currentTime = new Date().toLocaleTimeString();
         curTime = this.currentTime.split(":");

         this.currentDate = new Date().toLocaleDateString();
         curDate = this.currentDate.split(":");

         //Retrieve the time the user went to sleep
         prevTime = this.sleepTime.split(":");
         tempSeconds = prevTime[2];

         //Retrive the date the user went to sleep
         prevDate = this.sleepDate.split(":");

         //Our value has a PM on the end, we need to remove it
         prevSeconds = tempSeconds.split(" ");
         prevTime[2] = prevSeconds[0];

         //Calculate how much time has passed
         //Hrs
         passedHours = (12 - Number(prevTime[0]));
         passedHours = ((Number(curTime[0]) + Number(passedHours)) -12);

         //Mins
         passedMins = (60 - Number(prevTime[1]));
         passedMins = ((Number(curTime[1]) + Number(passedMins)) - 60);

         //If there are more than 60 minutes, convert to hours and minutes
         if (Number(passedMins) > 60) {

             passedHours = Math.floor((passedHours + (Number(passedMins) / 60)));
             console.log('passedHrs', passedHours);
             console.log('passedMins', passedMins);
             passedMins = Math.floor((passedMins - (passedHours * 60)));
         }

        
         //FOR TESTING --ONLY--
          Number(passedHours += 2);

         //Record the time slept
         this.lineChartLabels.push(this.currentDate);
         this.lineChartData[0].data.push(Number((String(passedHours).concat(".").concat(passedMins))));

         this.lineChartData[0]['data'][1]--;
         // just trying refresh full variable
         this.lineChartData = this.lineChartData.slice();

         var comboArray: Array<any> = [0,0];
         comboArray[0] = this.lineChartData;
         comboArray[1] = this.lineChartLabels;

         this.events.publish('SleepWake:wake', comboArray);

    }
}
