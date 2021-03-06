import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface LoaderState {
    show: boolean;
    message: string;
}

@Injectable()
export class LoaderService {
    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();

    show() {
        this.loaderSubject.next(<LoaderState>{ show: true });
    }
    hide() {
        this.loaderSubject.next(<LoaderState>{ show: false });
    }
}