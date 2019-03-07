import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Sim } from '@ionic-native/sim/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sim: Sim
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.sim.getSimInfo().then(
      //   (info) => alert(info),
      //   (err) => console.log('Unable to get sim info: ', err)
      // );
    });



    // this.sim.hasReadPermission().then(
    //   (info) => console.log('Has permission: ', info)
    // );

    // this.sim.requestReadPermission().then(
    //   () => console.log('Permission granted'),
    //   () => console.log('Permission denied')
    // );
  }


}
