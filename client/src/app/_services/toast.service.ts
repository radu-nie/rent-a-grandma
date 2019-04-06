import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable()
export class ToastService {

    toast;
    constructor(private toastCtrl: Toast, ) {

    }

    create(message, ok = false, duration = 2000) {
        if (this.toast) {
            this.toast.hide();
        }

        this.toast = this.toastCtrl.showWithOptions({
            message,
            duration: ok ? null : duration,
            position: 'bottom'
        }),//Success callback
            function (args) {
                console.log(args.event);
                //This will print 'hide'
            },
            function (error) {
                console.error('toast error: ', error);
            };
    }
}