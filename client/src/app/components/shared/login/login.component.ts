import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../../../_services';
import { ActionSheetController, Platform } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Backlight } from '@ionic-native/backlight/ngx';
import { PlatformLocation } from '@angular/common';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { CardIO } from '@ionic-native/card-io/ngx';
import { throwError } from 'rxjs';
@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    providers: [Geolocation, Backlight, CardIO]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    gps: Geoposition;
    cardDetail: any;
    flashLight: boolean = false;
    file: any;
    constructor(private cardIO: CardIO,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public actionSheetController: ActionSheetController,
        private nativeGeocoder: NativeGeocoder,
        private geolocation: Geolocation,
        private platform: Platform,
        private backlight: Backlight,
        platformLocation: PlatformLocation
    ) {
        console.log((platformLocation as any).location);
        console.log((platformLocation as any).location.href);
        console.log((platformLocation as any).location.origin);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            file: [null]
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
    get f(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }

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
                    this.submitted = false;
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.submitted = false;
                });
    }

    scan() {
        this.cardIO.canScan()
            .then(
                (res: boolean) => {
                    if (res) {
                        let options = {
                            requireExpiry: true,
                            requireCVV: false,
                            requirePostalCode: false
                        };
                        this.cardIO.scan(options).then(data => {
                            this.cardDetail = data;
                        }).catch(err => {
                            throwError(err);
                        }).finally();

                    }
                }
            );
    }
    toggleFlashLight() {

        // Turn backlight on
        this.backlight.on().then(() => console.log('backlight on'));




    }
    submitPhoto() {
        debugger;
        if (this.file)
            this.authenticationService.savePhoto(this.file);
    }
    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            this.file = event.target.files[0];
            reader.readAsDataURL(this.file);
            this.submitPhoto()
            //   reader.onload = () => {
            //     this.loginForm.get('avatar').setValue({
            //       filename: this.file.name,
            //       filetype: this.file.type,
            //       value: reader.result.split(',')[1]
            //     })
            //   };
        }
    }
}
