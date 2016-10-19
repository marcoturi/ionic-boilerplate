import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    template: require('./home.html'),
})
export class HomePage {
    public user;

    constructor(public navCtrl: NavController) {
        // console.log(process.env.NODE_ENV);
        // const myArr = [
        //     {
        //         name: 'barney',
        //         age: 36,
        //         active: true,
        //     },
        //     {
        //         name: 'fred',
        //         age: 40,
        //         active: false,
        //     }];
        //
        // this.user = (_.filter(myArr, o => !o.active))[0];
        this.user = {
                    name: 'barney',
                    age: 36,
                    active: true,
                };
    }

}
