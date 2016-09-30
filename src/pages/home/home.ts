import { Component } from '@angular/core';
import { filter } from 'lodash-es';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
    public user;

    constructor(public navCtrl: NavController) {
        console.log(process.env.NODE_ENV);

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

        this.user = (filter(myArr, o => !o.active))[0];
    }

}
