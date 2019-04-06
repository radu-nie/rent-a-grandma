import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../_services';
import { MatSnackBar } from '@angular/material';
@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService, private snackBar: MatSnackBar) {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            if (message) {
                this.message = message;
                this.snackBar.open(message.text, 'Close', {
                    duration: 4000,
                });
            }
        });
    }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            if (message) {
                this.message = message;
                this.snackBar.open(message.text, 'Close', {
                    duration: 4000,
                });
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}