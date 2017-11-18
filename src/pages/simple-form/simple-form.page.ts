import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'ib-page-simple-form',
    templateUrl: './simple-form.page.html',
})
export class SimpleFormPage implements OnInit {
    public simpleFormForm: FormGroup;

    constructor(public formBuilder: FormBuilder) {
    }

    public ngOnInit() {
        this.simpleFormForm = this.formBuilder.group({
            name: new FormControl( '' ),
        });

    }

    public save() {
        console.log(this.simpleFormForm.value);
    }
}
