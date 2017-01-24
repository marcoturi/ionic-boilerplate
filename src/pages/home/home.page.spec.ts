import {  } from 'jasmine';
import { HomePage } from './home.page';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { NavController } from 'ionic-angular';

describe('Home Page:', () => {

    let comp: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [HomePage],
            providers: [
                {provide: NavController, useValue: NavController},
            ],
        });
        fixture = TestBed.createComponent(HomePage);
        // #trick
        // If you want to trigger ionViewWillEnter automatically de-comment the following line
        // fixture.componentInstance.ionViewWillEnter();
        fixture.detectChanges();
        comp = fixture.componentInstance;
        de = fixture.debugElement;
    });

    describe('.constructor()', () => {
        it('Should be defined', () => {
            expect(comp).toBeDefined();
        });
    });

    it('Barney should be the user', () => {
        expect(comp.user).toEqual({
            name: 'barney',
            age: 36,
            active: true,
        });
    });

    it('Fred should not be the user', () => {
        expect(comp.user).not.toEqual({
            name: 'fred',
            age: 36,
            active: true,
        });
    });
});
