import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs.page';

@Component({
    template: `
        <ion-nav [root]="rootPage"></ion-nav>`,
})
export class MyApp {
    public rootPage = TabsPage;

    constructor(public platform: Platform,
                public splashScreen: SplashScreen) {
        this.platformReady();
    }

    public platformReady() {
        // Call any initial plugins when ready
        this.platform.ready().then(() => {
            this.splashScreen.hide();
        });
    }
}
