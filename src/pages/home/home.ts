import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('lineCanvas') lineCanvas;

    lineChart: any;

    constructor(public navCtrl: NavController) {
    }

    ionViewWillEnter () {
    //ionViewDidLoad() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: ["timestamp", "timestamp2", "timestamp3", "timestamp4"],
                datasets: [{
                    label: 'Temperatura Reservatório',
                    data: [0, 2, 4, 5],
                    fill: false,
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 2
                }]
            },
            options: {}
        })
    }
}



   /* function addData(chart, label, data) {
        this.lineChart.data.labels.push(label);
        this.lineChart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        return this.lineChart.update();
}*/

