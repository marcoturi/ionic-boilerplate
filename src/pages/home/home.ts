import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import filter from 'lodash-es/filter';

@Component({
    selector: 'page-home',
    templateUrl: './home.html',
})
export class HomePage {
    public user;

    constructor(public navCtrl: NavController) {
        const myArr = [
            {
                name: 'barney',
                age: 36,
                active: true,
            },
            {
                name: 'fred',
                age: 40,
                active: false,
            }];

        this.user = (filter(myArr, o => o.active))[0];
    }

}
