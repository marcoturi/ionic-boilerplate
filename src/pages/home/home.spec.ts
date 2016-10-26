import { HomePage } from './home';
import { async, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockNavController } from 'ionic-angular/util/mock-providers';
import { NavController } from 'ionic-angular';

describe('Home Page:', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: NavController, useValue: mockNavController},
                HomePage,
            ],
        });
        TestBed.compileComponents();
    }));

    it('Barney should be the user', inject([HomePage], (home: HomePage) => {
        expect(home.user).toEqual({
            name: 'barney',
            age: 36,
            active: true,
        });
    }));

    it('Fred should not be the user', inject([HomePage], (home: HomePage) => {
        expect(home.user).not.toEqual({
            name: 'fred',
            age: 36,
            active: true,
        });
    }));
});
