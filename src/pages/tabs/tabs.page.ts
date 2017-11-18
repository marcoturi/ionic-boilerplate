import { Component } from '@angular/core';

import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { ContactPage } from '../contact/contact.page';

@Component({
    templateUrl: 'tabs.page.html',
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    public tab1Root: any = HomePage;
    public tab2Root: any = AboutPage;
    public tab3Root: any = ContactPage;

    constructor() { //
    }
}
