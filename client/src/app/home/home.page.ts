import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomeComponent {
  auth: any;
  constructor(private authService: AuthenticationService) {
    this.auth = authService;
  }
  logout() {
    this.authService.logout();
    location.reload(true);
  }

}
