import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Camera } from '@ionic-native/camera/ngx';

import { AlertService, UserService } from '../../../_services';
import { CameraProvider } from 'client/src/app/_providers/util/camera';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
export enum RegistrationTypeEnum {
    CLIENT,
    PROVIDER
}
@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [Camera, CameraProvider, ActionSheet]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    registrationTypeSelected: boolean;
    showCustomer: boolean;
    showProvider: boolean;
    constructor(
        private cameraProvider: CameraProvider,
        private actionSheet: ActionSheet,
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
        this.registrationTypeSelected = false;
        this.showCustomer = false;
        this.showProvider = false;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            agreement: [''],
            uniqueId: [''],
            serialCode: [''],
            serialNo: [''],
            address: [''],
            criminalHistoryPhoto: [''],
            utilitiesPhoto: [''],
            facialPhoto: ['']
        });
    }

    // convenience getter for easy access to form fields
    get f(): { [key: string]: AbstractControl } { return this.registerForm.controls; }

    register() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            this.alertService.error("Formularul nu este valid!");
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    setRegistrationType(regType: number) {
        switch (regType) {
            case RegistrationTypeEnum.CLIENT:
                this.showProvider = false;
                this.showCustomer = true;
                this.registrationTypeSelected = true;
                break;
            case RegistrationTypeEnum.PROVIDER:
                this.showCustomer = false;
                this.showProvider = true;
                this.registrationTypeSelected = true;
                break;
            default:
                this.alertService.error("Invalid Option");
                break;
        }
    }

    resetRegistrationType() {
        this.showCustomer = false;
        this.showProvider = false;
        this.registrationTypeSelected = false;
        this.registerForm.reset();
        this.registerForm.markAsPristine();
    }

    triggerGetPhoto() {
        let options: ActionSheetOptions = {
            title: 'What do you want with this image?',
            subtitle: 'Choose an action',
            buttonLabels: ['Load from Library', 'Use Camera'],
            addCancelButtonWithLabel: 'Cancel',
            addDestructiveButtonWithLabel: 'Delete',
            //androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK,
            destructiveButtonLast: true
        }

        this.actionSheet.show(options).then((buttonIndex: number) => {
            if (buttonIndex == 0) {
                this.cameraProvider.getPictureFromPhotoLibrary().then(data => {
                    console.log(data);
                }).catch(err => {
                    this.alertService.error(err);
                });
            } else if (buttonIndex == 1) {
                this.cameraProvider.getPictureFromCamera().then(data => {
                    console.log(data);
                }).catch(err => {
                    this.alertService.error(err);
                });
            }
        });

        // let actionSheet = this.actionSheetCtrl.create({
        //     title: 'Select Image Source',
        //     buttons: [
        //       {
        //         text: 'Load from Library',
        //         handler: () => {
        //           this.cameraProvider.getPictureFromPhotoLibrary().then(data => {
        //               console.log(data);
        //           }).catch(err => {
        //               this.alertService.error(err);
        //           });
        //         }
        //       },
        //       {
        //         text: 'Use Camera',
        //         handler: () => {
        //             this.cameraProvider.getPictureFromCamera().then(data => {
        //                 console.log(data);
        //             }).catch(err => {
        //                 this.alertService.error(err);
        //             });
        //         }
        //       },
        //       {
        //         text: 'Cancel',
        //         role: 'cancel'
        //       }
        //     ]
        //   });
        //   actionSheet.present();
    }
}


