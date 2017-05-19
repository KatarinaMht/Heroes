import { Alert } from './../../models/alert.model';
import { Input, Component, OnInit } from '@angular/core';

@Component({
     moduleId: module.id,
    selector: 'esl-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit {

    @Input()
    public alerts: Array<Alert> = [];

    constructor() { }

    ngOnInit() { }

    public closeAlert(alert: Alert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}