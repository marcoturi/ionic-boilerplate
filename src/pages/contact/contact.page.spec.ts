import { ContactPage } from './contact.page';
import { TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockNavController } from 'ionic-angular/util/mock-providers';
import { NavController } from 'ionic-angular';

describe('Contact Page', () => {

    beforeEach(() => TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
            {provide: NavController, useValue: mockNavController},
            ContactPage,
        ],
    }));

    it('should have a url', inject([ContactPage], (contac: ContactPage) => {
        expect(contac).toBeDefined();
    }));
});
