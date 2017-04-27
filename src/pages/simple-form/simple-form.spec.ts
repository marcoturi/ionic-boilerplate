import { SimpleFormPage } from './simple-form.page';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    App, Platform, Config, Keyboard,
    Form, IonicModule, DomController,
} from 'ionic-angular';
import {
    mockConfig, mockDomController, MockPlatform, mockPlatform,
} from 'ionic-angular/util/mock-providers';

describe('Simple form Page:', () => {

    let comp: SimpleFormPage;
    let fixture: ComponentFixture<SimpleFormPage>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [SimpleFormPage],
            providers: [
                App,
                Form,
                Keyboard,
                { provide: Platform, useClass: MockPlatform },
                { provide: DomController, useValue: mockDomController(mockPlatform()) },
                { provide: Config, useValue: mockConfig() },
            ],
            imports: [
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
            ],
        });
        fixture = TestBed.createComponent(SimpleFormPage);
        // #trick
        // If you want to trigger ionViewWillEnter automatically de-comment the following line
        // fixture.componentInstance.ionViewWillEnter();
        fixture.detectChanges();
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        comp.ngOnInit();
    });

    describe('.constructor()', () => {
        it('Should be defined', () => {
            expect(comp).toBeDefined();
        });
    });
});
