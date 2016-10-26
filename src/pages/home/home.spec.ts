import { HomePage } from './home';
import { async, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockNavController } from 'ionic-angular/util/mock-providers';
import { NavController } from 'ionic-angular';

describe('Sales Service', () => {

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

    it('should log ngOnInit', inject([ HomePage ], (home: HomePage) => {
        // const fixture = TestBed.createComponent(home);
        // fixture.detectChanges();
        expect(home.user).toEqual({
            name: 'barney',
            age: 36,
            active: true,
        });
    }));
});
