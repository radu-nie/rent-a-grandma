import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { LoaderService, LoaderState } from "./loader.service";


@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: []
})
export class LoaderComponent implements OnInit, OnDestroy, AfterViewInit {
    show: boolean = false;
    message: string = 'Loading';
    private subscription: Subscription;
    @ViewChild('loaderOverlay') showLoader;

    constructor(private loaderService: LoaderService) {

    }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                /** Hide/Show element */
                document.getElementById("loaderOverlay").style.visibility = (state.show ? "visible" : "hidden");
                document.getElementById("routerOutletContainer").style.display = (state.show ? "none" : "block");
                this.message = state.message || "Loading";
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngAfterViewInit() {
        document.getElementById("loaderOverlay").style.visibility = "hidden";
    }
}