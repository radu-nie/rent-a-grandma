import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Sim } from '@ionic-native/sim/ngx';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Backlight } from '@ionic-native/backlight/ngx';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    gps: Geoposition;
    flashLight: boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public actionSheetController: ActionSheetController,
        private sim: Sim,
        private nativeGeocoder: NativeGeocoder,
        private geolocation: Geolocation,
        private platform: Platform,
        private backlight: Backlight
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.platform.ready().then(() => {
            this.test();

        })

        // this.sim.getSimInfo().then(
        //     (info) => {
        //         this.r = info
        //     },
        //     (err) => console.log('Unable to get sim info: ', err)
        // );

        // this.sim.hasReadPermission().then(
        //     (info) => console.log('Has permission: ', info)
        // );

        // this.sim.requestReadPermission().then(
        //     () => console.log('Permission granted'),
        //     () => console.log('Permission denied')
        // );
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    test() {
        var options = { timeout: 10000, enableHighAccuracy: false };
        this.geolocation.getCurrentPosition(options).then((resp) => {
            this.gps = resp;
        }).catch((error) => {
            this.gps = error;
            console.log('Error getting location', error);
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    toggleFlashLight() {

        // Turn backlight on
        this.backlight.on().then(() => console.log('backlight on'));




    }
}
