import { ContactPage } from './contact';
import { TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockNavController } from 'ionic-angular/util/mock-providers';
import { NavController } from 'ionic-angular';

describe('Sales Service', () => {

    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: [ContactPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: NavController, useValue: mockNavController},
            ],
        });
        TestBed.compileComponents();
        done();
    });

    // it('should load component', async(() => {
    //     const fixture = TestBed.createComponent(ContactPage);
    //     fixture.detectChanges();
    //     expect(fixture).toBeDefined();
    // }));

    it('should have a url', inject([ContactPage], (app: ContactPage) => {
        const fixture = TestBed.createComponent(app);
        fixture.detectChanges();
        expect(fixture).toBeDefined();
    }));
});
